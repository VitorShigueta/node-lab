let EmailModel = require('./models/email')

let msg = new EmailModel({
  email: 'alex.rodrigo@GMAIL.COM'
})

//save in db
msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
    })

//find in db
EmailModel
    .find({
      email: 'ada.lovelace@gmail.com'   // search query
    })
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })

//find one and update
EmailModel
  .findOneAndUpdate(
    {
      email: 'ada.lovelace@gmail.com' 
    }, 
    {
      email: 'theoutlander@live.com'   
    },
    {
      new: true,                      
      runValidators: true             
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })

//delete in db
EmailModel
  .findOneAndRemove({
    email: 'theoutlander@live.com'
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })