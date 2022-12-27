import jwt from 'jsonwebtoken';


//if user wants to like a post, update a post, delete a post, we need to check if the user is authenticated or not
//we will use this middleware to check if the user is authenticated or not
//we will use this middleware in the routes
  
const auth = async (req, res, next) => {
    try {
        const token = res.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;