package handler

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/skip2/go-qrcode"
)

var (
	urlStore = make(map[string]string)
	id       = 0
	mutex    sync.Mutex
	base62   = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)

type QR struct {
	Content string `json:"content"`
}

func (code *QR) Generate() ([]byte, error) {
	qrCode, err := qrcode.Encode(code.Content, qrcode.Medium, 256)
	if err != nil {
		return nil, fmt.Errorf("could not generate a QR code: %v", err)
	}
	return qrCode, nil
}

func GenerateQR(c *gin.Context) {
	var qr QR
	if err := c.ShouldBindJSON(&qr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}
	short := shortenURL(qr.Content)
	qr.Content = short
	code, err := qr.Generate()
	if err != nil {
		log.Fatal("Error generating qr code")
	}
	c.JSON(http.StatusOK, gin.H{
		"short_url": short,
		"qr_code":   code,
	})
}

// shorten url
func shortenURL(longURL string) string {
	mutex.Lock()
	defer mutex.Unlock()

	id++
	shortURL := encodeBase62(id)
	urlStore[shortURL] = longURL
	return "http://localhost:8000/" + shortURL
}

func encodeBase62(num int) string {
	if num == 0 {
		return string(base62[0])
	}

	result := ""
	for num > 0 {
		result = string(base62[num%62]) + result
		num /= 62
	}
	return result
}

func Redirect(c *gin.Context) {
	shortURL := c.Param("shortURL")
	mutex.Lock()
	defer mutex.Unlock()

	longURL, exists := urlStore[shortURL]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}
	c.Redirect(http.StatusMovedPermanently, longURL)
}
