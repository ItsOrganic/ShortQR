package server

import (
	"net/http"

	"github.com/ItsOrganic/ShortQR/handler"
	"github.com/gin-gonic/gin"
)

func Init() {
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Hello world"})
	})
	r.POST("/generate", handler.GenerateQR)
	r.GET("/:shortURL", handler.Redirect)

	r.Run(":8000")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
