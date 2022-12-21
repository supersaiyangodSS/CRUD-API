const e = require('express');
const express = require('express');
const app = express();
const path = require('path');

const connection = require('./db/connection');

const port = 4000 || process.env.PORT;

app.set('View', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded( { extended: false } ));
app.use(express.json());

app.get('/', (req, res) => {
    // res.send('This is order!');
    res.render('index');
});

app.get('/users', (req, res) => {
    let sql = `SELECT * FROM USERS`;
    connection.query(sql, (err, data) => {
        if (data.length > 0) {
            res.render('users', { main: data });
            return;
        }
        else {
            console.log('error');
            return;
        }
    });
});

app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    if(!id) {
        res.send('please provide id');
        console.log('please provide id');
    }
    else {
        let sql = `SELECT * FROM USERS WHERE id = ?`
        connection.query(sql, id, (err, result) => {
            if(err) {
                throw err;
            }
            else {
                res.render('getById', {order: result});
            }
        });
    }
});

app.post('/user', (req, res) => {
    let user = req.body.user;
    let email = req.body.email;
    if(!user) {
        res.send('please enter user');
    }
    else {
        let sql = `INSERT INTO USERS VALUES ('', ?, ?, '')`;
        connection.query(sql, [user, email], (err) => {
            if (err) {
                console.log('error occured while adding new user!');
                console.log(err);
            }
            else {
                res.send('user added successfully');
            }
        });
    }
});

app.put('/user', (req, res) => {
    let id = req.body.id;
    let user = req.body.user;
    if(!id) {
        res.send('please provide id');
    }
    else {
        let sql = `UPDATE users SET name = ? WHERE id = ?`;
        connection.query(sql, [user, id], (err) => {
            if (err) {
                console.log('error occured while updating the user');
            }
            else {
                console.log('user updated successfully');
            }
        });
    }
});

app.delete('/user', (req, res) => {
    let id = req.body.id;
    if (!id) {
        res.send('provide id to delete user');
    }
    else {
        let sql = `DELETE FROM users WHERE id = ?`;
        connection.query(sql, id, (err, result) => {
            if (err) {
                console.log('an error occured while deleting the user');
            }
            else {
                res.send('user deleted successfully');
            }
        });
    }
});

app.listen(port, () => {console.log(`server is up and running on port:${port}`)})