const Book = require('../../models/book');
const User = require('../../models/user');
const Request = require('../../models/request');
const {transformRequest} = require('./merge');

module.exports = {
    createRequest: async (args) => {
        const request = new Request({
            book: args.requestInput.book,
            sender: args.reqeustInput.sender,
            receiver: args.requestInput.receiver,
            status: args.reqeustInput.status,
            date: new Date(args.reqeustInput.date)
        })
        try{
            const result = await request.save();
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    },
    requests: async ({receiverID}) => {
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
    cancelRequest: async({requestID}) => {
        try{
            const request = await Request.find({_id: requestID});
            request.status = "canceled";
            const result = await request.save();
            return transformRequest(result);
        }
        catch(err){
            throw err;
        }
    }

};