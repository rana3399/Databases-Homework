# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
```sql
CREATEDB cyf_classes

```
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
```sql
CREATE TABLE mentors (
   id              SERIAL PRIMARY KEY,
   name            VARCHAR (120) NOT NULL,
   years_Lived      INT,
   address         VARCHAR (120),
   prog_Language    VARCHAR (50)

)

```
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
```sql
INSERT INTO mentors (name) VALUES ('edward'),('amanda'),('yonnah'),('abdul'),('tomy')

```
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
```sql
CREATE TABLE  students (
   id                   SERIAL PRIMARY KEY,
   name                 VARCHAR (120) NOT NULL,
   address              VARCHAR (120),
   is_cyf_graduated     VARCHAR (20)
)

```
5. Insert 10 students in the `students` table.
```sql
INSERT INTO students (name, address , is_cyf_graduated)
VALUES ('rana', 'addressRana-1', 'yes'), 
('elmira', 'addressElmira-2', 'yes'),
('suman', 'addressSuman-3', 'yes'),
('bianca', 'addressBianka-4', 'yes'),
('omar', 'addressOmar-5', 'yes'),
('diego', 'addressDiego-6', 'yes'),
('mamudul', 'addressSHK-7', 'NO'),
('sheikh', 'address-8', 'NO'),
('luisa', 'addressLS-9', 'yes'),
('tom', 'addressTom-10', 'NO')

```
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).

```sql
SELECT name , address FROM students

```
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

```sql
CREATE TABLE classes (
   id       SERIAL PRIMARY KEY,
   leading_mentor  VARCHAR (30),
   topic     VARCHAR (80) NOT NULL,
   date      DATE NOT NULL,
   location  VARCHAR (120)

)

```

8. Insert a few classes in the `classes` table
```sql
INSERT INTO classes (leading_mentor, topic, date)
VALUE ( 'Edward', 'database', '30-10-2021')
```
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
```sql

CREATE TABLE attended_class (
   id   SERIAL PRIMARY KEY,
   classId      INT REFERENCES classes (id) NOT NULL,
   classTopic   VARCHAR REFERENCES classes (topic),
   studentId    INT REFERENCES students(id) NOT NULL,
   studentName  VARCHAR REFERENCES students(name)  NOT NULL
)

```
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).

```sql


```
