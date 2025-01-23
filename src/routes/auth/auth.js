
export const auth = function(req, res, next)  {

    console.log('current user auth -> ', req.currentUser)
    if(!req.currentUser) {
        throw new Error('User is not authorized!');
    }
    next();
 };
 