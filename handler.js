"use strict";
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

module.exports.tick = async (event) => {
  // Get the name of the table 
  // const tableName = process.env.NAME_DYNAMODB;

  const newEntry = {
      id: context.awsRequestId,
      data: event.body,
      createdAt: new Date().toISOString(),
  };

  try {
      await dynamodb.put({
          TableName: tableName,
          Item: newEntry
      }).promise();
  
      return {
          statusCode: 201,
          body: JSON.stringify(newEntry),
      };
  } catch (error) {
      return { error };
  }
};