package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ShortLink struct {
	Id        primitive.ObjectID `json:"id", bson:"_id",omitempty`
	URL       map[string]string  `json: "url"`
	CreatedAt time.Time          `json:"timestamp"`
	Validity  time.Duration      `json:"validity"`
}

type QR struct {
	Content string `json:"content"`
	Size    int    `json:"size"`
}
