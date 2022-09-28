//const express = require('express');
import express from 'express';

const app = express();

app.listen(3001, () => {
	console.log('connected');
});
