const nodemailer = require("nodemailer");
require("dotenv").config();
const sendgrid = require("nodemailer-sendgrid");
const jwt=require('jsonwebtoken')
const nodemailerSendgrid = require("nodemailer-sendgrid");

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
  })
);

const sendConfirmationEmail = async user => {
  const token = await jwt.sign(
    {
      _id: user._id
    },
    process.env.SECRET
  );
  const url = `http://localhost:3000/confirmation/${token}`;

  transport.sendMail({
    from: "no-reply@easychannel.com",
    to: `${user.name} ${user.email}`,
    subject: "Confirmation Email",
    html: `<a href=${url}> ${url}</a>`
  }).then(()=>{
      console.log('Email sent')
  }).catch(()=>{
      console.log('Email not sent')
  })
};

exports.sendConfirmationEmail=sendConfirmationEmail