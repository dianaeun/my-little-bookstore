const Book = require('../../models/book');
const User = require('../../models/user');
const Request = require('../../models/request');
const {transformRequest} = require('./merge');

module.exports = {
    createRequest: async (args) => {
        const request = new Request({
            bookTitle: args.requestInput.bookTitle,
            book: args.requestInput.book,
            sender: args.requestInput.sender,
            receiver: args.requestInput.receiver,
            status: args.requestInput.status,
            date: new Date(args.requestInput.date)
        })
        try{
            const result = await request.save();
            console.log("Request Saved!!, result:", result)
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    },
    receivedRequests: async ({receiverID}) => {
        try {
            const requests = await Request.find({receiver: receiverID});
            return requests.map(request => {
                return transformRequest(request);
            })
        }
        catch(err){
            throw err;
        }
    },
    sentRequests: async ({senderID}) => {
        try {
            const requests = await Request.find({sender: senderID});
            return requests.map(request => {
                return transformRequest(request);
            })
        }
        catch(err){
            throw err;
        }
    },
    cancelRequest: async({requestID}) => {
        try{
            let result = await Request.findOneAndUpdate({_id: requestID}, {status: "canceld"}, {new: true});
            console.log(result);
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    },
    acceptRequest: async({requestID}) => {
        try{
            let result = await Request.findOneAndUpdate({_id: requestID}, {status: "accepted"}, {new: true});
            console.log(result);
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    },
    declineRequest: async({requestID}) => {
        try{
            let result = await Request.findOneAndUpdate({_id: requestID}, {status: "declined"}, {new: true});
            console.log(result);
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    }

};