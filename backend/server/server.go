package server

import (
	"net/http"

	"github.com/ItsOrganic/ShortQR/handler"
	"github.com/gin-gonic/gin"
)

func Init() {
	r := gin.Default()
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Hello world"})
	})
	r.POST("/generate", handler.GenerateQR)
	r.Run(":8000")
}
