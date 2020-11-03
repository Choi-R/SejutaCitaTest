const AWS = require('aws-sdk');
const config = require('./config')
const { success,error } = require('./helper')
AWS.config.update(config.aws_remote_config)

exports.createSomething = (req, res) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      Item: {
        id: req.body.id,
        name: req.body.name,
      },
    };
    dynamoDb.put(params, (err, data) => {
      if (err) {
        error(res, err, 406)
      }
      else {
        success(res, params.Item, 201)
      }
    })
}

exports.getSomething = (req, res) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
    }
    dynamoDb.scan(params, (err, data) => {
      if (err) {
        error(res, err, 404)
      }
      else {
        success(res, data, 200)
      }
    })
}

exports.editSomething = (req, res) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      Key: {
        "id": parseInt(req.params.id)
      },
      UpdateExpression: 'SET #nm = :val1',
      ExpressionAttributeValues: {
        ":val1": req.body.name
      },
      ExpressionAttributeNames: {
        "#nm": "name"
      },
      ReturnValues: "UPDATED_NEW"
    }
    dynamoDb.update(params, (err, data) => {
      if (err) {
        error(res, err, 422)
      }
      else {
        success(res, data, 200)
      }
    })
}

exports.deleteSomething = (req, res) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      Key: {
        "id": parseInt(req.params.id)
      },
    }
    dynamoDb.delete(params, (err, data) => {
      if (err) {
        error(res, err, 422)
      }
      else {
        success(res, "DELETED! MWHAHAHAHAA!", 200)
      }
    })
}
