const express = require('express');
const Student = require('./models/student');

const router = express.Router();

router.get('/students', function(req, res){
  Student.find({}, (err, students) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.render('index.html', { students: students });
    }
  })
});

router.get('/students/new', (req, res) => {
  res.render('addStudents.html');
});

router.post('/students/new', (req, res) => {
  console.log(req.body);
  Student.create(req.body, (err, data) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  })
});

router.get('/students/edit', (req, res) => {
  Student.findById(req.query.id.replace(/"/g, ''), (err, student) => {
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
    } else {
      res.render('editStudent.html', {
        student: student
      })
    }
  })
});

router.post('/students/edit', (req, res) => {
  Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''), req.body, (err, student) => {
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  })
});

router.get('/students/delete', (req, res) => {
  Student.findByIdAndRemove(req.query.id.replace(/"/g, ''), (err) => {
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  });
})

module.exports = router;