package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/skip2/go-qrcode"
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
	code, err := qr.Generate()
	if err != nil {
		log.Fatal("Error generating qr code")
	}
	c.JSON(http.StatusOK, code)
}

func ShortenURL(c *gin.Context) {

}
