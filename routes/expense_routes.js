const router = require('express').Router();

let User = require("../model/user_model");
let Category = require("../model/category_model");
let Expense = require("../model/expense_model");


router.get("/", (req, res)=> {
    res.json({login: "OK"});
});

router.get("/user", (req, res)=> {
    User.find({})
    .then(users => res.json(users))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.get("/category", (req, res)=> {
    Category.find({})
    .then(categories => res.json(categories))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.get("/expense", (req, res)=> {
    Expense.find({}).sort({isShared: 1})
    .then(expenses => res.json(expenses))
    .catch(err=> res.status(400).json("Error: " + err));
});


router.post("/addUser", (req, res)=> {
    User.create(req.body)
    .then(() => res.json("User added!"))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.post("/addExpense", (req, res)=> {
    Expense.create(req.body)
    .then(() => res.json("Expense added!"))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.delete("/deleteUser/:id", (req, res)=> {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.delete("/deleteExpense/:id", (req, res)=> {
    Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json("Expense deleted!"))
    .catch(err=> res.status(400).json("Error: " + err));
});

router.post("/updateExpense/:id", (req, res)=> {
    Expense.findByIdAndUpdate(req.body)
    .then(()=> res.json("Expense updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/shared", (req, res)=> {
    Expense.updateMany({}, {isShared: true}, {runValidators: true})
    .then(()=> res.json("All Existing Expenses shared!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/summary", (req, res)=> {
    Expense.aggregate([
        {$match: {isShared: false}},
        { $group: { _id: '$username', total_paid: { $sum: '$amount' }}},
        { $project: { _id: 0, name: '$_id',  total_paid: '$total_paid'}}
    ])
    .then(summary=> res.json(summary))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;