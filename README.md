## mongodb interact
`- we can interact with mongodb in three different ways.
    - callback
    - promises
    - async/await
`

# MongoDB

## basic command

mongosh -u root -p password

> show dbs;
> use <db-name>;
> db;
> db.<collection>.<command>(find, insert, update, updateMany, etc..)


------
1. create db
use hoangmaimarket

2. create collection
db.category

3. insert
db.category.insert({name: 'laptop'})

4. 
 show collections
 db.getCollectionNames()
 db.category.find()
db.use.find().pretty()
 <img src='./image/data-type.JPG' >

 ### query data
 > db.<collection>.find(query)
 //so sánh bằng
 {key:value}

 //so sánh không băng: not equal
 {key: {$ne: value}}

 //lớn hơn greater than
  {key: {$gt: value}}

//lớn hơn hoặc bằng
  {key: {$gte: value}}

//nhỏ hơn less than
{key: {$lt: value}}

//nhỏ hơn hoặc bằng
{key: {$lte: value}}

//nằm trong những value này
{key: {$in: value}}

//ko nằm trong những value này
{key: {$nin: value}}

//find all user with email address ends with .edu
use regular expression mongodb (regex mongo)
db.user.find({email: /\.edu$/})

//find all user with ip address start with 1
db.user.find(ip_address: /^1\./)


### query multi-field query
db.collection.find({
    key1: value1,
    key2: value2
})

$or
db.collection.find({
    $or: [condition1, condition2]
})

Explain: find all documents in collection that match either condition1 or condition2
Example: find all users who are male or age < 45
> db.user.find($or: [{gender: 'Male'}, {age: {$lt: 45}}])

### Nested object
{
    _id: ObjectId(...),
    profile: {
        city: 'hn',
        work: 'microsoft',
        skill: {
            ....
        }
    }
}

db.user.find({
    "profile.city": 'hn'
})

### Array fields
{
    languages: ['english', 'japanese', 'russia']
}

db.user.find({
    "languages": "english"
})

//find user speak two language
db.user.find({
    languages: {$size 2}
})

### Array of embedded documents

1. what is embedded documents?
{
    "name": 'Esme',
    "pets": [{"type": 2, "name": 'dog'}]
}

db.pet_owner.find({"pets.type": 2})

question: query all pet owners who have at least one pet of type 2 and name starts with C
db.pet_owner.find({
    pets: {
        $elemMatch: {type: 2,, name: /^C/}
    }
})