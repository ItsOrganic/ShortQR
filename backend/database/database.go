package database

import "go.mongodb.org/mongo-driver/mongo"

type MongoInstance struct {
	Client     *mongo.Client
	DbName     *mongo.Database
	Collection *mongo.Collection
}
