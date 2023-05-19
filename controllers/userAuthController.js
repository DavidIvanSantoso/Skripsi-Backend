const pool = require('./dbconnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { logger } = require('../middleware/logEvents');

const handleQueryError = (err, req, res) => {
    logger.error(`${err.message},\n                                       req: ${JSON.stringify(req.body)}`);
    res.status(500).json({ message: err.message });
  };


const userLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.sendStatus(401);

    // check user id and login
    pool.query(
        'SELECT userid, hashkey FROM userdata WHERE userid = $1', 
        [user], 
        (error, results) => {
            if (error) { 
                handleQueryError(error, req, res);  
            } else {
                if (results.rowCount > 0) {
                    // found, periksa password dengan hash nya...
                    const match = bcrypt.compare(pwd, results.rows[0].hashkey);
                    if (match) {
                        // create JWTs
                        const accessToken = jwt.sign(
                            { "userid": user },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '30s' }
                        );
                        const refreshToken = jwt.sign(
                            { "userid": user },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: '1d' }
                        );
    
                        // save refreshtoken kedalam database userdata
                        pool.query(
                            'UPDATE userdata SET refreshtoken = $2 WHERE userid = $1',
                            [user, refreshToken],
                            (error) =>  { 
                              if (error) {
                                handleQueryError(error, req, res);  
                              } else {
                                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                                res.json({ accessToken,user });        
                              }
                            }
                          );
                    }
                } else {
                    res.sendStatus(401);                    // wrong password 
                }
            }


      });
}

module.exports = { userLogin };