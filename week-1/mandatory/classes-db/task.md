CREATE TABLE mentors (
   id              SERIAL PRIMARY KEY,
   name            VARCHAR (120) NOT NULL,
   years_Lived     INT  NOT NULL,
   address         VARCHAR (120) NOT NULL, 
   prog_Language    VARCHAR (50)

)

INSERT INTO mentors (name, years_Lived , address, prog_Language)
VALUES ('edward', 8 , 'fake address 1', 'JavaScript'),
('amanda', 5 , 'fake address ', 'Java'),
('yonnah', 12 , 'fake address 3', 'PHP'),
('abdul', 2 , 'fake address 4', 'python'),
('tomy', 6 , 'fake address 5', 'C++')


SELECT * FROM mentors 

-- student table
CREATE TABLE  students (
   id                   SERIAL PRIMARY KEY,
   name                 VARCHAR (120) NOT NULL,
   address              VARCHAR (120) NOT NULL,
   is_cyf_graduated     VARCHAR (20) NOT NULL
)
SELECT * FROM students  

-- student table INSERT DATA
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

SELECT * FROM students

-- classes table
CREATE TABLE classes (
   id       SERIAL PRIMARY KEY,
   leading_mentor_id   INT REFERENCES mentors (id),
   topic     VARCHAR (80) NOT NULL,
   date      DATE NOT NULL,
   location  VARCHAR (120)

)

INSERT INTO classes (leading_mentor_id, topic, date, location)
VALUES ( '1', 'database', '30-10-2021', 'Glasgow'),
( '2', 'database', '30-01-2020', 'London'),
( '3', 'database', '20-5-2021','Glasgow'),
( '4', 'database', '10-10-2021','Glasgow'),
( '5', 'database', '15-08-2019','Barcelona')


SELECT * FROM classes

-- Attended Class table
CREATE TABLE attended_class (
   id           SERIAL PRIMARY KEY,
   classId	    INT REFERENCES classes (id) NOT NULL,
   studentId    INT REFERENCES students(id) NOT NULL
)

```sql
-- Retrieve all the mentors who lived more than 5 years in Glasgow
SELECT * FROM  mentors WHERE years_Lived > 5

-- Retrieve all the mentors whose favourite language is Javascript
SELECT * FROM  mentors WHERE prog_Language = 'JavaScript'

-- Retrieve all the students who are CYF graduates
SELECT * FROM students WHERE is_cyf_graduated = 'yes'

-- Retrieve all the classes taught before June this year
select * classes WHERE date < '2021-06-01'

-- Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).

```


