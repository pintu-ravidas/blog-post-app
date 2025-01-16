
export const auth = function(req, res, next)  {

    console.log('current user auth -> ', req.currentUser)
    //console.log('current user req -> ', req)
    if(!req.currentUser) {
        throw new Error('User is not authorized!');
    }
    next();
 };
 