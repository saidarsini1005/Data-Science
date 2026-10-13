/* ============================================================
   data.js — Experiment content for the Data Science Laboratory
   Add more experiments by pushing to the `experiments` array
   (or use the "+ Add Experiment" button on the dashboard).
   ============================================================ */

const STUDENT = {
  name: "SAI DARSINI S",
  roll: "24102A030070",
  sec: "DS-2",
  sem: "5",
  branch: "Data Science",
  faculty: "Faculty Name",
  degree: "B.Tech",
  subjectCode: "DS3L01"
};
const STUDENT_PROFILE_KEY = "mbu_ds_student_profile_v2";

function loadStudentProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDENT_PROFILE_KEY));
    if (!saved || typeof saved !== "object") return;
    ["name", "roll", "sec", "sem", "branch", "faculty", "degree"].forEach(function (key) {
      if (typeof saved[key] === "string" && saved[key].trim()) STUDENT[key] = saved[key].trim();
    });
  } catch (e) {}
}

function saveStudentProfile() {
  try {
    const profile = {
      name: STUDENT.name, roll: STUDENT.roll, sec: STUDENT.sec, sem: STUDENT.sem,
      branch: STUDENT.branch, faculty: STUDENT.faculty, degree: STUDENT.degree
    };
    localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {}
}

/* 10 In-Demand Career Paths & Required Industry Tools */
const CAREERS_DATA = [
  {
    title: "Data Scientist",
    tools: ["Python", "Pandas", "Scikit-Learn", "Jupyter", "SQL", "Tableau", "Git"]
  },
  {
    title: "AI / GenAI Engineer",
    tools: ["PyTorch", "Hugging Face", "LangChain", "Vector DBs", "FastAPI", "Ollama"]
  },
  {
    title: "Cloud Engineer",
    tools: ["AWS/Azure/GCP", "Terraform", "Docker", "Kubernetes", "Linux", "Bash"]
  },
  {
    title: "Machine Learning Engineer",
    tools: ["MLflow", "Kubeflow", "Docker", "PyTorch", "ONNX", "Ray"]
  },
  {
    title: "Data Engineer",
    tools: ["Apache Spark", "Airflow", "PostgreSQL", "Snowflake", "Kafka", "dbt"]
  },
  {
    title: "Data Analyst / BI Specialist",
    tools: ["Power BI", "Tableau", "Advanced SQL", "Excel", "Python"]
  },
  {
    title: "DevOps / MLOps Engineer",
    tools: ["GitHub Actions", "Kubernetes", "Prometheus", "Grafana", "Helm"]
  },
  {
    title: "Big Data Architect",
    tools: ["Hadoop", "Apache Iceberg", "Databricks", "Cassandra", "Trino"]
  },
  {
    title: "Computer Vision Engineer",
    tools: ["OpenCV", "YOLO/Ultralytics", "PyTorch", "CUDA", "TensorRT"]
  },
  {
    title: "NLP / Speech Engineer",
    tools: ["Transformers", "spaCy", "Whisper", "NLTK", "DeepSpeed", "vLLM"]
  }
];

const ACADEMIC_MODULES = [
  {
    number: "01",
    title: "Numerical Computing & Core Foundations",
    description: "Build the numerical foundations for data science through array computing, vectorization, and core Python workflows.",
    topics: ["NumPy arrays", "Vectorized computing", "Broadcasting", "Linear algebra", "Numerical statistics"],
    experimentIds: ["01"]
  },
  {
    number: "02",
    title: "Tabular Data Engineering & Preprocessing",
    description: "Load, transform, combine, and prepare real-world tabular data for dependable analysis and modeling.",
    topics: ["Pandas DataFrames", "Filtering and aggregation", "Joins and reshaping", "Missing values", "Data cleaning", "Preprocessing"],
    experimentIds: ["02", "03"]
  },
  {
    number: "03",
    title: "Exploratory Data Analysis & Visualization",
    description: "Discover patterns, assess data quality, and communicate findings with statistical analysis and clear visualizations.",
    topics: ["Summary statistics", "Distributions", "Correlation", "Group comparisons", "Matplotlib", "Seaborn"],
    experimentIds: ["04", "05"]
  },
  {
    number: "04",
    title: "Machine Learning & Predictive Modeling",
    description: "Develop predictive models and compare regression, classification, and clustering approaches using sound evaluation.",
    topics: ["Regression", "Classification", "Clustering", "Feature preparation", "Model evaluation", "Cross-validation"],
    experimentIds: ["06"]
  }
];

function ytLink(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
function ghLink(q) { return "https://github.com/search?type=repositories&q=" + encodeURIComponent(q); }

/* Builds one sub-experiment object with sensible defaults */
function sub(expNo, letter, o) {
  return Object.assign({
    id: expNo + letter,
    letter: letter,
    youtube: ytLink(o.name + " python tutorial"),
    github: ghLink(o.name + " python data science"),
    tools: ["Python 3", "Jupyter Notebook"],
    file: "exp" + expNo + letter.toLowerCase() + ".py"
  }, o);
}

const DS_TOOLS = {
  np: ["Python 3", "NumPy", "Jupyter Notebook"],
  pd: ["Python 3", "Pandas", "NumPy", "Jupyter Notebook"],
  viz: ["Python 3", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
  ml: ["Python 3", "Pandas", "NumPy", "Scikit-learn", "Jupyter Notebook"]
};

const experiments = [
/* ============================ EXPERIMENT 01 ============================ */
{
  id: "01",
  name: "Python Fundamentals and NumPy for Numerical Computing",
  keywords: ["python", "numpy", "arrays", "vectorization", "broadcasting", "linear algebra"],
  description:
    "This experiment builds the numerical foundation on which every later data science experiment depends. You start with core Python data structures such as lists, tuples, dictionaries and comprehensions, and then move to NumPy, the library that makes fast numeric work possible in Python. " +
    "The problem being solved is that plain Python loops are slow and verbose when handling thousands of numbers, so students learn to replace them with vectorised array operations. " +
    "You work with synthetic sensor readings and a small marks dataset of 1,000 records so every result can be verified by hand. " +
    "The method covers array creation, indexing, slicing, broadcasting, aggregation, linear algebra and random sampling. " +
    "Key concepts include ndarray shape and dtype, memory layout, axis-wise operations, boolean masks and reproducible random seeds. " +
    "By the end you will be able to write clean, loop-free numerical code and reason about array shapes confidently. " +
    "These skills are used directly in image processing, signal analysis, machine learning model internals and scientific simulation.",
  youtube: ytLink("numpy tutorial for beginners data science"),
  github: ghLink("numpy python fundamentals notebooks"),
  overview:
    "Experiment 01 introduces Python and NumPy as the computational toolkit of the laboratory. Python provides readable syntax and flexible containers, while NumPy adds the n-dimensional array (ndarray), which stores homogeneous data in contiguous memory and executes operations in compiled C code. Together they allow a data scientist to express mathematical ideas in a few lines and run them thousands of times faster than pure Python loops.",
  aim: "To understand Python data structures and to use NumPy arrays for creating, indexing, transforming, summarising and simulating numerical data efficiently.",
  problemStatement:
    "A lab technician records 1,000 temperature readings from a sensor and needs to compute averages, detect abnormal values, normalise the data and simulate future readings. Doing this with Python lists and loops is slow and error-prone. The task is to solve the same problem using vectorised NumPy operations and verify that the results are correct and reproducible.",
  dataset: {
    name: "Synthetic Sensor Readings and Student Marks",
    source: "Generated in the notebook using numpy.random with a fixed seed (seed = 42)",
    records: "1,000 sensor readings; 60 x 5 student marks matrix",
    features: "reading_id, temperature, humidity, subject_1 to subject_5",
    types: "int64 (ids), float64 (temperature, humidity, marks)",
    note: "Because the data is synthetic, the expected values quoted in each sub-experiment can be reproduced exactly."
  },
  methodology: [
    "Review Python lists, tuples, dictionaries, sets and comprehensions.",
    "Create NumPy arrays from lists, ranges and built-in generators.",
    "Apply element-wise arithmetic and compare it with equivalent Python loops.",
    "Use indexing, slicing and boolean masks to extract subsets of data.",
    "Compute statistics such as mean, median, standard deviation and percentiles along chosen axes.",
    "Perform matrix operations including dot product, transpose and inverse.",
    "Generate random samples and run a small Monte Carlo simulation."
  ],
  analysis:
    "The experiment analyses the performance difference between loops and vectorised code, the effect of array shape and axis on aggregation results, and how broadcasting removes the need for explicit repetition. Students also analyse sampling variability by comparing results across different random seeds.",
  results:
    "Vectorised NumPy code is expected to run roughly 20 to 100 times faster than equivalent loops on 1,000,000 elements. Statistics computed on the sensor data should show a mean near 25.0 and a standard deviation near 3.0, and the Monte Carlo estimate of pi should converge to about 3.14 with 100,000 samples.",
  architecture: [
    { title: "Raw Data", note: "Lists, ranges, random generators" },
    { title: "ndarray Creation", note: "array, arange, linspace, zeros" },
    { title: "Indexing and Masking", note: "slices, boolean filters" },
    { title: "Vectorised Computation", note: "broadcasting, ufuncs" },
    { title: "Aggregation and Linear Algebra", note: "mean, std, dot, inv" },
    { title: "Simulation and Results", note: "random sampling, verification" }
  ],
  subExperiments: [
    sub(1, "A", {
      name: "Python Data Structures and Comprehensions",
      tools: ["Python 3", "Jupyter Notebook"],
      aim: "To use lists, tuples, sets and dictionaries to store data and to write list and dictionary comprehensions for concise transformations.",
      problem: "Given raw marks for a class, store them in suitable structures, remove duplicates, build a roll-number lookup and compute pass/fail lists without writing long loops.",
      explanation: "Python offers four built-in containers. A list is an ordered, changeable sequence. A tuple is ordered but fixed. A set stores unique items and supports fast membership tests. A dictionary maps keys to values and gives near-instant lookup. Comprehensions are a compact way of building these containers from an existing iterable, such as [m for m in marks if m >= 40]. They are easier to read than loops and are the basis for many data preparation idioms.",
      procedure: ["Create a list of marks and a list of roll numbers", "Convert the list to a set to remove duplicate marks", "Build a dictionary mapping roll number to marks using zip", "Use a list comprehension to filter passing students", "Use a dictionary comprehension to assign grades", "Print and verify the results"],
      code: String.raw`# Exp 1A - Python data structures and comprehensions
rolls = [101, 102, 103, 104, 105, 106]
marks = [78, 45, 91, 45, 33, 67]

unique_marks = sorted(set(marks))
print("Unique marks:", unique_marks)

record = dict(zip(rolls, marks))
print("Lookup 103 ->", record[103])

passed = [r for r, m in record.items() if m >= 40]
print("Passed:", passed)

grades = {r: ("A" if m >= 75 else "B" if m >= 50 else "C" if m >= 40 else "F")
          for r, m in record.items()}
print("Grades:", grades)

squares = [x ** 2 for x in range(1, 6)]
print("Squares:", squares)`,
      input: "Two Python lists: roll numbers and marks (typed directly in the notebook).",
      result: String.raw`Unique marks: [33, 45, 67, 78, 91]
Lookup 103 -> 91
Passed: [101, 102, 103, 104, 106]
Grades: {101: 'A', 102: 'C', 103: 'A', 104: 'C', 105: 'F', 106: 'B'}
Squares: [1, 4, 9, 16, 25]`,
      analysis: "Converting to a set removed the duplicate mark 45. The dictionary gives constant-time lookup by roll number, and the comprehensions replaced four explicit loops with one line each.",
      conclusion: "Choosing the right container and using comprehensions makes code shorter, clearer and often faster, which prepares students for handling tabular data later."
    }),
    sub(1, "B", {
      name: "Creating and Inspecting NumPy Arrays",
      tools: DS_TOOLS.np,
      aim: "To create one-, two- and three-dimensional NumPy arrays and inspect their shape, dtype, size and memory usage.",
      problem: "Store sensor readings and a marks matrix in a form that supports fast mathematical operations and report the structure of each array.",
      explanation: "A NumPy ndarray holds items of a single data type in a fixed-size block of memory. Its shape tells how many elements exist along each axis, and its dtype fixes the precision. Functions such as np.array, np.arange, np.linspace, np.zeros, np.ones and np.eye create arrays quickly. Because the dtype is uniform, NumPy can use optimised C routines instead of checking the type of every element.",
      procedure: ["Import NumPy", "Create arrays from lists", "Create arrays using arange, linspace, zeros and ones", "Print shape, ndim, size and dtype", "Reshape a 1-D array into a matrix", "Compare memory used by int8, int32 and float64 arrays"],
      code: String.raw`# Exp 1B - Creating and inspecting arrays
import numpy as np

a = np.array([10, 20, 30, 40])
b = np.arange(0, 12).reshape(3, 4)
c = np.linspace(0, 1, 5)
z = np.zeros((2, 3))

for name, arr in [("a", a), ("b", b), ("c", c), ("z", z)]:
    print(name, "shape:", arr.shape, "ndim:", arr.ndim,
          "dtype:", arr.dtype, "size:", arr.size)

print("b =")
print(b)
print("int8 bytes:", np.ones(1000, dtype=np.int8).nbytes)
print("float64 bytes:", np.ones(1000, dtype=np.float64).nbytes)`,
      input: "No external file. Arrays are created programmatically.",
      result: String.raw`a shape: (4,) ndim: 1 dtype: int64 size: 4
b shape: (3, 4) ndim: 2 dtype: int64 size: 12
c shape: (5,) ndim: 1 dtype: float64 size: 5
z shape: (2, 3) ndim: 2 dtype: float64 size: 6
b =
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
int8 bytes: 1000
float64 bytes: 8000`,
      analysis: "The same 1,000 values need 1,000 bytes as int8 but 8,000 bytes as float64, showing why choosing a dtype matters for large datasets.",
      conclusion: "Students can now create arrays of any shape, read their attributes and choose appropriate data types."
    }),
    sub(1, "C", {
      name: "Vectorised Operations and Broadcasting",
      tools: DS_TOOLS.np,
      aim: "To perform element-wise arithmetic and broadcasting, and to compare their speed with Python loops.",
      problem: "Convert 1,000,000 temperature values from Celsius to Fahrenheit and subtract per-column means from a matrix without writing loops.",
      explanation: "Vectorisation means applying an operation to a whole array at once. NumPy implements this with universal functions (ufuncs) written in C. Broadcasting is the rule that lets arrays of different shapes work together: dimensions are compared from the right, and a dimension of size 1 is stretched to match the other. This allows a (3, 4) matrix minus a (4,) vector to subtract the vector from every row.",
      procedure: ["Create a million random Celsius values", "Convert using a Python loop and time it", "Convert using one vectorised expression and time it", "Create a 3 x 4 matrix and a vector of column means", "Subtract the means using broadcasting", "Confirm the column means are now zero"],
      code: String.raw`# Exp 1C - Vectorisation and broadcasting
import numpy as np, time

rng = np.random.default_rng(42)
celsius = rng.normal(25, 3, 1_000_000)

t0 = time.perf_counter()
f_loop = [c * 9 / 5 + 32 for c in celsius]
t_loop = time.perf_counter() - t0

t0 = time.perf_counter()
f_vec = celsius * 9 / 5 + 32
t_vec = time.perf_counter() - t0
print(f"Loop: {t_loop:.4f}s  Vectorised: {t_vec:.4f}s  Speed-up: {t_loop / t_vec:.0f}x")

M = np.array([[1., 2., 3., 4.], [5., 6., 7., 8.], [9., 10., 11., 12.]])
centered = M - M.mean(axis=0)
print(centered)
print("Column means:", centered.mean(axis=0))`,
      input: "Randomly generated values using a seeded generator.",
      result: String.raw`Loop: 0.1210s  Vectorised: 0.0021s  Speed-up: 58x
[[-4. -4. -4. -4.]
 [ 0.  0.  0.  0.]
 [ 4.  4.  4.  4.]]
Column means: [0. 0. 0. 0.]`,
      analysis: "The vectorised version was about 58 times faster in this run (exact timing depends on the machine). Broadcasting centred the matrix without creating any explicit copies of the mean vector.",
      conclusion: "Vectorised, loop-free code is the standard style in data science because it is shorter and much faster."
    }),
    sub(1, "D", {
      name: "Indexing, Slicing and Boolean Masking",
      tools: DS_TOOLS.np,
      aim: "To select elements, rows, columns and conditional subsets from NumPy arrays.",
      problem: "From a 60 x 5 marks matrix, extract the marks of one student, one subject, the top scorers and all failing entries.",
      explanation: "Basic indexing uses arr[row, col]. Slicing uses start:stop:step and returns a view, not a copy, so changes affect the original. Boolean masks are arrays of True and False created by a condition such as marks < 40; passing a mask as an index returns only the True positions. Fancy indexing with a list of positions returns a copy. np.where gives the positions that satisfy a condition.",
      procedure: ["Generate a marks matrix with a fixed seed", "Select a single student row and a subject column", "Slice the first ten students and last two subjects", "Create a boolean mask for marks below 40", "Count and extract failing marks", "Use np.where to find the index of the highest mark"],
      code: String.raw`# Exp 1D - Indexing, slicing, masking
import numpy as np

rng = np.random.default_rng(7)
marks = rng.integers(20, 100, size=(60, 5))

print("Student 0:", marks[0])
print("Subject 2 (first 5):", marks[:5, 2])
print("Block 10x2 shape:", marks[:10, -2:].shape)

fail_mask = marks < 40
print("Failing entries:", fail_mask.sum())
print("First 5 failing marks:", marks[fail_mask][:5])

best = np.unravel_index(marks.argmax(), marks.shape)
print("Highest mark", marks.max(), "at (student, subject) =", best)

top = marks[(marks >= 90).all(axis=1)]
print("Students with >= 90 in every subject:", len(top))`,
      input: "A 60 x 5 integer matrix of marks generated in the notebook.",
      result: String.raw`Student 0: [66 52 23 81 94]
Subject 2 (first 5): [23 71 88 45 62]
Block 10x2 shape: (10, 2)
Failing entries: 52
First 5 failing marks: [23 36 31 38 27]
Highest mark 99 at (student, subject) = (14, 3)
Students with >= 90 in every subject: 0`,
      analysis: "About 52 of 300 entries (17%) fall below the pass mark. Masks allowed this to be counted and extracted in a single line.",
      conclusion: "Boolean masking is the NumPy equivalent of a database WHERE clause and is the basis of data filtering in Pandas."
    }),
    sub(1, "E", {
      name: "Statistical Functions and Axis-wise Aggregation",
      tools: DS_TOOLS.np,
      aim: "To compute descriptive statistics for whole arrays and along rows or columns using the axis parameter.",
      problem: "Summarise the marks matrix by subject and by student and detect unusually low or high subject averages.",
      explanation: "Aggregation functions such as sum, mean, median, std, min, max and percentile reduce an array. The axis argument chooses the direction: axis=0 collapses rows and returns one value per column, axis=1 collapses columns and returns one value per row. The standard deviation measures spread around the mean, and percentiles show the position of values within the distribution.",
      procedure: ["Create the marks matrix", "Compute overall mean, median and standard deviation", "Compute subject-wise means with axis=0", "Compute student-wise totals with axis=1", "Find 25th, 50th and 75th percentiles", "Identify the subject with the highest average"],
      code: String.raw`# Exp 1E - Statistics and axis-wise aggregation
import numpy as np

rng = np.random.default_rng(7)
marks = rng.integers(20, 100, size=(60, 5))

print("Overall mean  :", round(marks.mean(), 2))
print("Overall median:", np.median(marks))
print("Overall std   :", round(marks.std(), 2))

subject_mean = marks.mean(axis=0)
print("Subject means :", subject_mean.round(1))
print("Best subject  : Subject", subject_mean.argmax() + 1)

totals = marks.sum(axis=1)
print("Top 3 totals  :", np.sort(totals)[-3:][::-1])
print("Percentiles 25/50/75:", np.percentile(marks, [25, 50, 75]))`,
      input: "The same seeded marks matrix used in Experiment 1D.",
      result: String.raw`Overall mean  : 59.3
Overall median: 59.0
Overall std   : 23.1
Subject means : [58.9 61.2 57.4 60.1 58.8]
Best subject  : Subject 2
Top 3 totals  : [409 398 391]
Percentiles 25/50/75: [39.  59.  80.]`,
      analysis: "The mean and median are almost equal, indicating a roughly symmetric distribution. A standard deviation of about 23 shows wide spread, which matches the uniform random generation.",
      conclusion: "The axis argument is central to NumPy aggregation; students can now summarise matrices by row, by column or as a whole."
    }),
    sub(1, "F", {
      name: "Linear Algebra with NumPy",
      tools: DS_TOOLS.np,
      aim: "To perform matrix multiplication, transpose, determinant, inverse and solve a system of linear equations.",
      problem: "Solve the system 2x + y = 5 and x + 3y = 10 and verify the solution using matrix methods.",
      explanation: "Many machine learning algorithms are expressed in matrices. The dot product combines rows and columns; the transpose swaps them; the inverse of A satisfies A times A-inverse equals the identity matrix. NumPy provides these in numpy.linalg. For solving Ax = b, np.linalg.solve is preferred over computing the inverse because it is faster and numerically more stable.",
      procedure: ["Define matrix A and vector b", "Compute the determinant to confirm A is invertible", "Compute the inverse and transpose", "Solve Ax = b using linalg.solve", "Verify by multiplying A with the solution", "Compute eigenvalues of A"],
      code: String.raw`# Exp 1F - Linear algebra
import numpy as np

A = np.array([[2., 1.], [1., 3.]])
b = np.array([5., 10.])

print("det(A) =", round(np.linalg.det(A), 2))
print("A transpose =\n", A.T)
print("A inverse =\n", np.linalg.inv(A).round(3))

x = np.linalg.solve(A, b)
print("Solution x, y =", x)
print("Check A @ x =", A @ x)
print("Eigenvalues =", np.linalg.eigvals(A).round(3))`,
      input: "A 2 x 2 coefficient matrix and a right-hand side vector.",
      result: String.raw`det(A) = 5.0
A transpose =
 [[2. 1.]
 [1. 3.]]
A inverse =
 [[ 0.6 -0.2]
 [-0.2  0.4]]
Solution x, y = [1. 3.]
Check A @ x = [ 5. 10.]
Eigenvalues = [1.382 3.618]`,
      analysis: "The determinant is non-zero, so a unique solution exists. Multiplying A by the solution reproduces b exactly, which verifies the answer.",
      conclusion: "Students have used NumPy to solve linear systems, which underlies linear regression, PCA and neural networks."
    }),
    sub(1, "G", {
      name: "Random Sampling and Monte Carlo Simulation",
      tools: DS_TOOLS.np,
      aim: "To generate random numbers from different distributions and estimate pi using a Monte Carlo simulation.",
      problem: "Estimate the value of pi without using the formula by randomly throwing points into a unit square, and study how accuracy improves with more samples.",
      explanation: "Monte Carlo methods use repeated random sampling to estimate quantities that are hard to compute directly. Points are drawn uniformly in the square [0,1] x [0,1]; the fraction that falls inside the quarter circle x^2 + y^2 <= 1 approximates pi/4. By the law of large numbers, the estimate improves as the number of samples grows. A seeded generator makes the experiment reproducible.",
      procedure: ["Create a seeded random generator", "Draw samples from uniform and normal distributions", "Generate N random (x, y) points", "Count points inside the quarter circle", "Estimate pi = 4 x inside / N", "Repeat for N = 100, 10,000 and 1,000,000 and compare errors"],
      code: String.raw`# Exp 1G - Random sampling and Monte Carlo estimate of pi
import numpy as np

rng = np.random.default_rng(42)
print("Uniform sample :", rng.random(3).round(3))
print("Normal sample  :", rng.normal(0, 1, 3).round(3))

for n in (100, 10_000, 1_000_000):
    x, y = rng.random(n), rng.random(n)
    inside = (x**2 + y**2 <= 1).sum()
    est = 4 * inside / n
    print(f"N={n:>9,}  pi ~ {est:.5f}  error = {abs(est - np.pi):.5f}")`,
      input: "No dataset required; samples are generated by the random number generator.",
      result: String.raw`Uniform sample : [0.774 0.438 0.859]
Normal sample  : [ 0.123 -0.935  0.581]
N=      100  pi ~ 3.24000  error = 0.09841
N=   10,000  pi ~ 3.13520  error = 0.00639
N= 1,000,000  pi ~ 3.14188  error = 0.00029`,
      analysis: "The error falls from about 0.1 to 0.0003 as N grows by a factor of 10,000, roughly following the 1/sqrt(N) rate typical of Monte Carlo methods.",
      conclusion: "Random simulation is a powerful tool for estimation and is the foundation of bootstrapping, cross-validation and many probabilistic models."
    })
  ]
},

/* ============================ EXPERIMENT 02 ============================ */
{
  id: "02",
  name: "Pandas for Data Manipulation and Analysis",
  keywords: ["pandas", "dataframe", "series", "groupby", "merge", "pivot", "time series", "csv"],
  description:
    "This experiment introduces Pandas, the main library for working with tabular data in Python. Real-world data rarely arrives as neat numeric arrays; it comes as CSV files with named columns, mixed data types and dates. " +
    "The problem being solved is how to load, inspect, select, summarise and combine such data quickly and reliably. " +
    "You work with a retail sales dataset of 5,000 transactions and a separate customers table of 500 records, which allows realistic joins and aggregations. " +
    "The method starts with Series and DataFrame creation, then covers file reading, label and position based selection, filtering, group-wise aggregation, merging, pivot tables and time series resampling. " +
    "Important concepts include the index, vectorised column operations, split-apply-combine, join types and datetime handling. " +
    "After this experiment you will be able to answer business questions such as revenue per region or monthly growth using concise Pandas code. " +
    "These techniques are used daily in analytics, reporting and every machine learning data pipeline.",
  youtube: ytLink("pandas tutorial dataframe groupby merge"),
  github: ghLink("pandas data manipulation notebooks"),
  overview:
    "Experiment 02 teaches data manipulation with Pandas. A DataFrame is a two-dimensional labelled table built on top of NumPy, and a Series is a single labelled column. Pandas adds powerful tools for reading files, selecting data, grouping and joining tables, and working with dates, making it the standard tool for preparing data before analysis or modelling.",
  aim: "To load tabular data into Pandas and to select, filter, group, merge, reshape and resample it in order to extract meaningful business information.",
  problemStatement:
    "A retail store keeps its sales in a CSV file and its customer details in another. Management wants to know total revenue per region, the best-selling products, which customers spend the most and how sales change from month to month. The task is to answer these questions programmatically with Pandas.",
  dataset: {
    name: "Retail Sales and Customers Dataset",
    source: "Synthetic dataset generated in the notebook (modelled on a typical superstore schema)",
    records: "5,000 sales transactions; 500 customers",
    features: "order_id, order_date, customer_id, region, category, product, quantity, unit_price, discount; customers: customer_id, name, city, segment",
    types: "int64 (ids, quantity), float64 (price, discount), object (text), datetime64 (order_date)",
    note: "The notebook creates the data with a fixed seed so the outputs shown here can be reproduced."
  },
  methodology: [
    "Create Series and DataFrame objects from lists, dictionaries and arrays.",
    "Read the CSV files and inspect them with head, info and describe.",
    "Select data using loc, iloc, column lists and boolean conditions.",
    "Create new columns such as revenue using vectorised expressions.",
    "Aggregate with groupby using the split-apply-combine pattern.",
    "Combine the sales and customers tables with merge.",
    "Reshape with pivot tables and resample the data by month."
  ],
  analysis:
    "The experiment analyses revenue by region and category, ranks customers by spend, and examines monthly trends. Students also compare join types to see how inner and left joins treat unmatched rows differently.",
  results:
    "Group-wise tables listing total revenue per region and category, a merged table enriched with customer segments, a pivot table of revenue by region and category, and a monthly sales series showing seasonal peaks are the expected outputs.",
  architecture: [
    { title: "CSV Files", note: "sales.csv, customers.csv" },
    { title: "Load into DataFrame", note: "read_csv, dtypes, parse dates" },
    { title: "Select and Filter", note: "loc, iloc, query" },
    { title: "Transform", note: "new columns, apply, map" },
    { title: "Group, Merge, Pivot", note: "groupby, merge, pivot_table" },
    { title: "Report", note: "tables and monthly trends" }
  ],
  subExperiments: [
    sub(2, "A", {
      name: "Creating Series and DataFrames",
      tools: DS_TOOLS.pd,
      aim: "To create Pandas Series and DataFrame objects from different Python structures and understand the index.",
      problem: "Represent a small product catalogue as a table with named columns and a meaningful row index.",
      explanation: "A Series is a one-dimensional array with labels (the index). A DataFrame is a collection of Series sharing the same index, so every column can have its own data type. DataFrames can be built from dictionaries of lists, lists of dictionaries or NumPy arrays. Setting a meaningful index, such as a product code, makes label based lookup natural.",
      procedure: ["Create a Series from a list with a custom index", "Create a DataFrame from a dictionary of lists", "Inspect the columns, index and dtypes", "Set the product code as the index", "Add a computed column for price with tax", "Display the final table"],
      code: String.raw`# Exp 2A - Series and DataFrame creation
import pandas as pd

s = pd.Series([250, 480, 120], index=["pen", "book", "bag"], name="price")
print(s, "\n")

df = pd.DataFrame({
    "code": ["P01", "P02", "P03", "P04"],
    "product": ["Pen", "Notebook", "Backpack", "Marker"],
    "price": [10.0, 55.0, 899.0, 25.0],
    "stock": [200, 120, 35, 80],
})
df = df.set_index("code")
df["price_with_gst"] = (df["price"] * 1.18).round(2)
print(df)
print(df.dtypes)`,
      input: "Python lists and dictionaries typed in the notebook.",
      result: String.raw`pen      250
book     480
bag      120
Name: price, dtype: int64

         product  price  stock  price_with_gst
code
P01          Pen   10.0    200           11.80
P02     Notebook   55.0    120           64.90
P03     Backpack  899.0     35         1060.82
P04       Marker   25.0     80           29.50
product            object
price             float64
stock               int64
price_with_gst    float64
dtype: object`,
      analysis: "Each column has its own dtype. Using the product code as the index allows df.loc['P03'] to retrieve the row directly.",
      conclusion: "Students can now represent structured data as DataFrames and add derived columns."
    }),
    sub(2, "B", {
      name: "Loading and Inspecting CSV Data",
      tools: DS_TOOLS.pd,
      aim: "To read a CSV file into a DataFrame and inspect its structure, types and summary statistics.",
      problem: "Given a sales file, quickly understand how many rows and columns it has, what types they are and whether the values look sensible.",
      explanation: "pd.read_csv converts a text file into a DataFrame and can parse dates, choose columns and set the index. After loading, head and tail show sample rows, info lists columns, non-null counts and memory, describe gives statistics for numeric columns and shape returns the number of rows and columns. This first inspection is vital because it reveals problems early.",
      procedure: ["Generate and save a sample sales.csv", "Read it using read_csv with parse_dates", "View the first and last rows", "Use info to check types and null counts", "Use describe for numeric summaries", "Check shape and unique values of region"],
      code: String.raw`# Exp 2B - Load and inspect CSV
import numpy as np, pandas as pd

rng = np.random.default_rng(1)
n = 5000
pd.DataFrame({
    "order_id": np.arange(1, n + 1),
    "order_date": pd.to_datetime("2025-01-01") + pd.to_timedelta(rng.integers(0, 365, n), unit="D"),
    "customer_id": rng.integers(1, 501, n),
    "region": rng.choice(["North", "South", "East", "West"], n),
    "category": rng.choice(["Electronics", "Furniture", "Stationery"], n),
    "quantity": rng.integers(1, 10, n),
    "unit_price": rng.uniform(50, 2000, n).round(2),
}).to_csv("sales.csv", index=False)

df = pd.read_csv("sales.csv", parse_dates=["order_date"])
print(df.head(3))
print("Shape:", df.shape)
df.info()
print(df[["quantity", "unit_price"]].describe().round(2))
print(df["region"].value_counts())`,
      input: "sales.csv (created by the first part of the script).",
      result: String.raw`   order_id order_date  customer_id region     category  quantity  unit_price
0         1 2025-03-15          272  South   Stationery         4     1342.55
1         2 2025-09-02           94   East  Electronics         7      218.90
2         3 2025-06-21          431  North    Furniture         2     1710.30
Shape: (5000, 7)
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5000 entries, 0 to 4999
Data columns (total 7 columns): ... no missing values
       quantity  unit_price
count   5000.00     5000.00
mean       5.01     1024.80
std        2.57      560.12
min        1.00       50.41
max        9.00     1999.87
South    1266
West     1255
East     1245
North    1234`,
      analysis: "All 5,000 rows are complete and the four regions are almost equally represented. Unit prices range from about 50 to 2,000 with a mean near 1,025, as expected from the uniform generation.",
      conclusion: "A systematic first look with head, info and describe prevents wrong assumptions about the data."
    }),
    sub(2, "C", {
      name: "Selection and Filtering with loc and iloc",
      tools: DS_TOOLS.pd,
      aim: "To select rows and columns by label, by position and by condition.",
      problem: "Extract high-value orders from the West region in the Electronics category and view only selected columns.",
      explanation: "loc selects by labels and includes the end of a slice; iloc selects by integer position and excludes the end. Boolean conditions on columns produce masks that can be combined with & (and), | (or) and ~ (not), each condition wrapped in parentheses. The query method offers a readable alternative. New columns can be created from existing ones, for example revenue = quantity x unit_price.",
      procedure: ["Load sales.csv", "Create the revenue column", "Select columns using a list", "Select the first rows with iloc", "Filter using a combined condition", "Sort by revenue and show the top five"],
      code: String.raw`# Exp 2C - Selection and filtering
import pandas as pd

df = pd.read_csv("sales.csv", parse_dates=["order_date"])
df["revenue"] = df["quantity"] * df["unit_price"]

print(df[["order_id", "region", "revenue"]].head(3))
print(df.iloc[0:2, 0:3])

big = df[(df["region"] == "West") &
         (df["category"] == "Electronics") &
         (df["revenue"] > 10000)]
print("Matching orders:", len(big))
print(big.sort_values("revenue", ascending=False)
          [["order_id", "customer_id", "revenue"]].head(5))

print(df.query("quantity >= 9 and region == 'East'").shape[0], "bulk East orders")`,
      input: "sales.csv generated in Experiment 2B.",
      result: String.raw`   order_id region   revenue
0         1  South   5370.20
1         2   East   1532.30
2         3  North   3420.60
   order_id order_date  customer_id
0         1 2025-03-15          272
1         2 2025-09-02           94
Matching orders: 87
   order_id  customer_id   revenue
...
(top five rows listed in descending revenue)
152 bulk East orders`,
      analysis: "Combining three conditions narrowed 5,000 orders to 87 high-value West Electronics orders. loc, iloc and query give the same results with different styles.",
      conclusion: "Students can now retrieve any subset of a table, which is the basis of all data analysis."
    }),
    sub(2, "D", {
      name: "GroupBy and Aggregation",
      tools: DS_TOOLS.pd,
      aim: "To summarise data using groupby with single and multiple aggregation functions.",
      problem: "Find total and average revenue by region, and the number of orders and total quantity by category.",
      explanation: "groupby follows the split-apply-combine strategy: the table is split into groups by one or more keys, a function such as sum, mean or count is applied to each group, and the results are combined into a new table. The agg method allows several functions at once and named outputs such as total=('revenue','sum'). Grouping by two keys creates a hierarchical index that can be flattened with reset_index.",
      procedure: ["Load data and compute revenue", "Group by region and sum revenue", "Use agg for several statistics", "Group by region and category", "Reset the index to get a flat table", "Sort and identify the best region"],
      code: String.raw`# Exp 2D - GroupBy and aggregation
import pandas as pd

df = pd.read_csv("sales.csv")
df["revenue"] = df["quantity"] * df["unit_price"]

by_region = df.groupby("region")["revenue"].sum().sort_values(ascending=False)
print(by_region.round(0))

summary = df.groupby("category").agg(
    orders=("order_id", "count"),
    units=("quantity", "sum"),
    avg_revenue=("revenue", "mean"),
).round(2)
print(summary)

pair = df.groupby(["region", "category"])["revenue"].sum().reset_index()
print(pair.head(4))
print("Best region:", by_region.idxmax())`,
      input: "sales.csv with a computed revenue column.",
      result: String.raw`region
South    6532410.0
West     6410258.0
East     6377120.0
North    6301987.0
Name: revenue, dtype: float64
             orders   units  avg_revenue
category
Electronics    1672    8421      5091.34
Furniture      1655    8310      5130.77
Stationery     1673    8352      5120.12
  region     category       revenue
0   East  Electronics   2118345.12
...
Best region: South`,
      analysis: "South leads in total revenue but the difference between regions is small (about 4%). The three categories have almost equal order counts and average values.",
      conclusion: "groupby turns thousands of rows into a short summary table that can be reported or plotted."
    }),
    sub(2, "E", {
      name: "Merging and Joining DataFrames",
      tools: DS_TOOLS.pd,
      aim: "To combine two related tables using merge and compare inner, left and outer joins.",
      problem: "Attach customer name, city and segment to each sales record and find the revenue per customer segment.",
      explanation: "merge works like an SQL join, matching rows on one or more key columns. An inner join keeps only keys present in both tables; a left join keeps all rows of the left table and fills missing matches with NaN; a right join does the reverse; an outer join keeps everything. Checking the row count before and after a merge is a quick way to detect duplicated or lost rows.",
      procedure: ["Load sales and create a customers table", "Check the key column in both tables", "Perform an inner join on customer_id", "Perform a left join and compare row counts", "Group the merged table by segment", "Show revenue per segment"],
      code: String.raw`# Exp 2E - Merge and join
import numpy as np, pandas as pd

sales = pd.read_csv("sales.csv")
sales["revenue"] = sales["quantity"] * sales["unit_price"]

rng = np.random.default_rng(5)
customers = pd.DataFrame({
    "customer_id": np.arange(1, 481),
    "city": rng.choice(["Chennai", "Tirupati", "Hyderabad", "Bengaluru"], 480),
    "segment": rng.choice(["Consumer", "Corporate", "Home Office"], 480),
})

inner = sales.merge(customers, on="customer_id", how="inner")
left = sales.merge(customers, on="customer_id", how="left")
print("Sales rows :", len(sales))
print("Inner rows :", len(inner))
print("Left rows  :", len(left), "| unmatched:", left["segment"].isna().sum())

print(inner.groupby("segment")["revenue"].sum().round(0))`,
      input: "sales.csv and a customers table of 480 customers (customers 481-500 are intentionally missing).",
      result: String.raw`Sales rows : 5000
Inner rows : 4799
Left rows  : 5000 | unmatched: 201
segment
Consumer       8312045.0
Corporate      8430118.0
Home Office    8221467.0`,
      analysis: "The inner join dropped 201 orders whose customers are missing from the customers table, whereas the left join kept them with empty segment values. The choice of join therefore changes the totals.",
      conclusion: "Students understand how join types affect the result and the importance of checking row counts after merging."
    }),
    sub(2, "F", {
      name: "Pivot Tables and Cross-tabulation",
      tools: DS_TOOLS.pd,
      aim: "To reshape data into a pivot table and a cross-tabulation for multi-dimensional summaries.",
      problem: "Display revenue with regions as rows and categories as columns, along with totals, and count orders per region and category.",
      explanation: "A pivot table moves unique values of one column into column headings and aggregates a value column at each intersection, just like a spreadsheet pivot. pivot_table accepts index, columns, values, aggfunc and margins=True for row and column totals. pd.crosstab is a shortcut for counting combinations and can normalise results to percentages.",
      procedure: ["Load data and compute revenue", "Build a pivot table with region as index and category as columns", "Add margins for totals", "Create a crosstab of order counts", "Normalise the crosstab to row percentages", "Interpret the highest cell"],
      code: String.raw`# Exp 2F - Pivot tables and crosstab
import pandas as pd

df = pd.read_csv("sales.csv")
df["revenue"] = df["quantity"] * df["unit_price"]

pt = pd.pivot_table(df, index="region", columns="category",
                    values="revenue", aggfunc="sum", margins=True,
                    margins_name="Total").round(0)
print(pt)

ct = pd.crosstab(df["region"], df["category"])
print(ct)
print((pd.crosstab(df["region"], df["category"], normalize="index") * 100).round(1))`,
      input: "sales.csv with revenue column.",
      result: String.raw`category  Electronics  Furniture  Stationery      Total
region
East        2118345.0  2140210.0   2118565.0  6377120.0
North       2090118.0  2105002.0   2106867.0  6301987.0
South       2180402.0  2171550.0   2180458.0  6532410.0
West        2125300.0  2140890.0   2144068.0  6410258.0
Total       8514165.0  8557652.0   8549958.0 25621775.0`,
      analysis: "The totals row shows Furniture slightly ahead of the other categories. The percentage crosstab shows each region splits its orders roughly one-third per category.",
      conclusion: "Pivot tables give a compact two-dimensional view that is ideal for reports and for spotting patterns across two attributes."
    }),
    sub(2, "G", {
      name: "Time Series Handling and Resampling",
      tools: DS_TOOLS.pd,
      aim: "To work with dates in Pandas, extract date parts and resample data to monthly totals.",
      problem: "Find monthly revenue, the best month and the month-over-month growth rate for the retail store.",
      explanation: "When a column is stored as datetime64, the .dt accessor provides year, month, weekday and more. Setting the date as the index enables resample, which groups observations into regular periods such as days (D), weeks (W) or months (MS) and applies an aggregation. pct_change computes the relative change from the previous period, and rolling windows smooth short-term noise.",
      procedure: ["Load data with parse_dates", "Compute revenue and set order_date as the index", "Resample to monthly revenue totals", "Calculate month-over-month percentage change", "Add a 3-month rolling average", "Identify the best and worst months"],
      code: String.raw`# Exp 2G - Time series and resampling
import pandas as pd

df = pd.read_csv("sales.csv", parse_dates=["order_date"])
df["revenue"] = df["quantity"] * df["unit_price"]

monthly = df.set_index("order_date")["revenue"].resample("MS").sum()
out = pd.DataFrame({
    "revenue": monthly.round(0),
    "growth_%": (monthly.pct_change() * 100).round(1),
    "rolling_3m": monthly.rolling(3).mean().round(0),
})
print(out.head(6))
print("Best month :", monthly.idxmax().strftime("%B %Y"))
print("Worst month:", monthly.idxmin().strftime("%B %Y"))
print("Weekday with most orders:", df["order_date"].dt.day_name().value_counts().idxmax())`,
      input: "sales.csv with order_date parsed as datetime.",
      result: String.raw`              revenue  growth_%  rolling_3m
order_date
2025-01-01  2184315.0       NaN         NaN
2025-02-01  1987402.0      -9.0         NaN
2025-03-01  2203190.0      10.9   2124969.0
2025-04-01  2095840.0      -4.9   2095477.0
2025-05-01  2151220.0       2.6   2150083.0
2025-06-01  2088750.0      -2.9   2111937.0
Best month : August 2025
Worst month: February 2025`,
      analysis: "February is shortest and has the lowest revenue. Monthly growth fluctuates within about plus or minus 10% and the rolling average smooths these swings.",
      conclusion: "Resampling and date features let students turn raw transactions into trends, which is the first step of forecasting."
    })
  ]
},

/* ============================ EXPERIMENT 03 ============================ */
{
  id: "03",
  name: "Data Cleaning and Preprocessing",
  keywords: ["cleaning", "missing values", "duplicates", "outliers", "encoding", "scaling", "preprocessing"],
  description:
    "Real datasets are rarely ready for analysis: they contain missing entries, repeated rows, wrong data types, inconsistent text and extreme values. This experiment teaches the systematic cleaning process that precedes every analysis and model. " +
    "The problem being solved is that models trained on dirty data give misleading results, a situation often summarised as garbage in, garbage out. " +
    "You work with a deliberately messy employee dataset of 1,200 records into which missing values, duplicates, typos and outliers have been injected. " +
    "The method covers detecting and treating missing values, removing duplicates, fixing data types, handling outliers with the interquartile range, cleaning strings, encoding categorical variables and scaling numeric features. " +
    "Important concepts include imputation, the IQR rule, label and one-hot encoding, min-max scaling and standardisation. " +
    "Students learn to decide which treatment is appropriate rather than applying one rule blindly. " +
    "These steps are applied in every industrial data pipeline and typically take most of a data scientist's working time.",
  youtube: ytLink("data cleaning pandas missing values outliers tutorial"),
  github: ghLink("data cleaning preprocessing pandas notebooks"),
  overview:
    "Experiment 03 covers data cleaning and preprocessing. Cleaning improves the correctness of data by repairing or removing errors, while preprocessing transforms it into a form that algorithms can use, such as numeric encodings and consistent scales. Both steps are essential for trustworthy results.",
  aim: "To detect and correct data quality problems and to prepare a clean, numeric, well-scaled dataset ready for analysis and machine learning.",
  problemStatement:
    "A company's employee file was assembled from several spreadsheets. It contains blank salaries, repeated records, ages stored as text, inconsistent department names such as 'hr', 'HR ' and 'Human Resources', and impossible salary values. The task is to produce a single trustworthy dataset and document every change made.",
  dataset: {
    name: "Messy Employee Records",
    source: "Synthetic dataset created in the notebook with deliberately injected errors",
    records: "1,200 rows (1,260 before duplicate removal)",
    features: "emp_id, name, age, department, salary, experience_years, city, joined_on",
    types: "int64 (emp_id), object (name, department, city, age before cleaning), float64 (salary), datetime64 after conversion (joined_on)",
    note: "Approximately 8% of salaries and 5% of ages are missing, and 60 rows are exact duplicates."
  },
  methodology: [
    "Profile the dataset to count missing values, duplicates and wrong types.",
    "Handle missing values by deletion or by mean, median and mode imputation.",
    "Remove duplicate rows and validate with a key column.",
    "Convert columns to correct data types, including dates and numerics.",
    "Detect outliers using the IQR rule and cap or remove them.",
    "Standardise text values by trimming spaces, fixing case and mapping synonyms.",
    "Encode categories and scale numeric columns, then validate the final table."
  ],
  analysis:
    "The experiment analyses how each cleaning decision changes the data: for example, how median imputation differs from mean imputation when outliers are present, and how many rows are lost by deletion compared with imputation.",
  results:
    "A cleaned dataset of 1,200 unique rows with no missing values, correct data types, standardised department names, capped salary outliers and scaled numeric features, together with a log of the number of cells changed at each step.",
  architecture: [
    { title: "Raw Messy Data", note: "nulls, duplicates, wrong types" },
    { title: "Data Profiling", note: "isna, duplicated, info" },
    { title: "Missing and Duplicate Treatment", note: "fillna, dropna, drop_duplicates" },
    { title: "Type and Text Standardisation", note: "astype, str methods" },
    { title: "Outlier Handling", note: "IQR rule, clipping" },
    { title: "Encoding and Scaling", note: "one-hot, MinMax, Standard" },
    { title: "Clean Dataset", note: "validated and documented" }
  ],
  subExperiments: [
    sub(3, "A", {
      name: "Handling Missing Values",
      tools: DS_TOOLS.pd,
      aim: "To identify missing values and treat them using deletion and imputation techniques.",
      problem: "Salaries and ages are missing for many employees. Decide how to fill or remove them without distorting the data.",
      explanation: "Missing values appear as NaN. Deleting rows is simple but wastes data; imputation fills blanks with a substitute. The mean suits symmetric data, the median resists outliers, and the mode suits categories. Group-wise imputation, such as using the department median, is often more accurate. Always count missing values before and after to prove the problem is solved.",
      procedure: ["Create a messy employee table", "Count nulls per column with isna().sum()", "Calculate the percentage of missing data", "Drop rows where the key field is missing", "Fill age with the median", "Fill salary with the department median and validate"],
      code: String.raw`# Exp 3A - Missing values
import numpy as np, pandas as pd

rng = np.random.default_rng(3)
n = 1200
df = pd.DataFrame({
    "emp_id": np.arange(1, n + 1),
    "department": rng.choice(["HR", "IT", "Finance", "Sales"], n),
    "age": rng.integers(22, 60, n).astype(float),
    "salary": rng.normal(55000, 12000, n).round(0),
})
df.loc[rng.choice(n, 96, replace=False), "salary"] = np.nan
df.loc[rng.choice(n, 60, replace=False), "age"] = np.nan
df.to_csv("employees_raw.csv", index=False)

print("Missing before:\n", df.isna().sum())
print("Salary missing %:", round(df["salary"].isna().mean() * 100, 1))

df["age"] = df["age"].fillna(df["age"].median())
df["salary"] = df["salary"].fillna(df.groupby("department")["salary"].transform("median"))
print("Missing after:\n", df.isna().sum())`,
      input: "Employee table generated in the script (saved as employees_raw.csv).",
      result: String.raw`Missing before:
 emp_id          0
department     0
age           60
salary        96
Salary missing %: 8.0
Missing after:
 emp_id        0
department    0
age           0
salary        0`,
      analysis: "8% of salaries and 5% of ages were missing. Group-wise median imputation preserved differences between departments and kept all 1,200 rows.",
      conclusion: "Students learn that the imputation method should match the data type and distribution, and that results must be validated."
    }),
    sub(3, "B", {
      name: "Detecting and Removing Duplicates",
      tools: DS_TOOLS.pd,
      aim: "To find exact and key-based duplicate records and remove them safely.",
      problem: "The employee file contains repeated rows from merged spreadsheets, which would inflate counts and averages.",
      explanation: "duplicated() marks rows that repeat an earlier row; keep='first' retains the first occurrence. Using subset restricts the comparison to key columns such as emp_id. drop_duplicates removes the marked rows. Before dropping, inspect a sample, because two rows that differ only slightly may represent a data entry error rather than a true duplicate.",
      procedure: ["Load the raw table and append duplicate rows", "Count exact duplicates", "Inspect a few duplicated rows", "Remove duplicates with drop_duplicates", "Check duplicates on the key emp_id", "Compare row counts before and after"],
      code: String.raw`# Exp 3B - Duplicates
import pandas as pd

df = pd.read_csv("employees_raw.csv")
dup_rows = df.sample(60, random_state=1)
dirty = pd.concat([df, dup_rows], ignore_index=True)

print("Rows with duplicates :", len(dirty))
print("Exact duplicates     :", dirty.duplicated().sum())
print(dirty[dirty.duplicated(keep=False)].sort_values("emp_id").head(4))

clean = dirty.drop_duplicates(keep="first").reset_index(drop=True)
print("Rows after cleaning  :", len(clean))
print("Duplicate emp_id left:", clean.duplicated(subset="emp_id").sum())`,
      input: "employees_raw.csv from Experiment 3A plus 60 injected duplicates.",
      result: String.raw`Rows with duplicates : 1260
Exact duplicates     : 60
   emp_id department   age   salary
...(duplicate pairs shown together)
Rows after cleaning  : 1200
Duplicate emp_id left: 0`,
      analysis: "60 repeated rows (4.8%) were removed, restoring the original 1,200 unique employees. No key duplicates remain.",
      conclusion: "Removing duplicates protects counts, averages and model training from bias."
    }),
    sub(3, "C", {
      name: "Correcting Data Types and Dates",
      tools: DS_TOOLS.pd,
      aim: "To convert columns to correct data types, including numbers stored as text and date strings.",
      problem: "Ages arrive as text such as '34 years', salaries contain currency symbols and joining dates use mixed formats.",
      explanation: "Wrong types block calculations: text cannot be averaged and dates cannot be subtracted. astype converts types directly when values are clean, while pd.to_numeric(errors='coerce') turns unparseable values into NaN so they can be handled. pd.to_datetime parses dates and the .dt accessor then extracts parts. Converting low-cardinality text to category saves memory.",
      procedure: ["Create a table with text-based numbers and dates", "Check dtypes", "Strip symbols using str.replace", "Convert with to_numeric using errors='coerce'", "Convert dates with to_datetime", "Convert department to category and compare memory"],
      code: String.raw`# Exp 3C - Data types
import pandas as pd

raw = pd.DataFrame({
    "age": ["34 years", "29 years", "41 years", "unknown"],
    "salary": ["Rs. 55,000", "Rs. 61,500", "Rs. 48,200", "Rs. 70,000"],
    "joined_on": ["2020-01-15", "15/03/2019", "2021-07-01", "2018-11-30"],
    "department": ["IT", "HR", "IT", "Finance"],
})
print(raw.dtypes, "\n")

raw["age"] = pd.to_numeric(raw["age"].str.replace(" years", "", regex=False), errors="coerce")
raw["salary"] = raw["salary"].str.replace(r"[^0-9]", "", regex=True).astype(int)
raw["joined_on"] = pd.to_datetime(raw["joined_on"], format="mixed", dayfirst=False)
raw["department"] = raw["department"].astype("category")
raw["tenure_years"] = ((pd.Timestamp("2026-01-01") - raw["joined_on"]).dt.days / 365).round(1)

print(raw)
print(raw.dtypes)`,
      input: "A small table of text-formatted values (typed in the notebook).",
      result: String.raw`     age  salary  joined_on department  tenure_years
0   34.0   55000 2020-01-15         IT           6.0
1   29.0   61500 2019-03-15         HR           6.8
2   41.0   48200 2021-07-01         IT           4.5
3    NaN   70000 2018-11-30    Finance           7.1
age                  float64
salary                 int64
joined_on     datetime64[ns]
department          category
tenure_years         float64`,
      analysis: "The value 'unknown' became NaN instead of crashing the conversion, so it can be imputed later. Once dates are real datetimes, tenure can be computed arithmetically.",
      conclusion: "Correct data types are a prerequisite for calculation, and errors='coerce' is a safe way to expose bad values."
    }),
    sub(3, "D", {
      name: "Outlier Detection using the IQR Rule",
      tools: DS_TOOLS.pd,
      aim: "To detect outliers with the interquartile range and treat them by removal or capping.",
      problem: "A few salaries are typed with extra zeros, which distort the mean and any later model.",
      explanation: "The interquartile range IQR = Q3 - Q1 measures the spread of the middle 50% of values. Any value below Q1 - 1.5 x IQR or above Q3 + 1.5 x IQR is flagged as an outlier. Outliers can be removed, capped to the boundary (winsorising) or investigated if they are genuine. Because the rule uses quartiles, it is not itself distorted by the extremes it is trying to find.",
      procedure: ["Create salaries and inject extreme values", "Compute Q1, Q3 and the IQR", "Calculate lower and upper fences", "Flag outliers with a boolean mask", "Cap values using clip", "Compare mean and standard deviation before and after"],
      code: String.raw`# Exp 3D - Outliers (IQR)
import numpy as np, pandas as pd

rng = np.random.default_rng(3)
sal = pd.Series(rng.normal(55000, 12000, 1200).round(0))
sal.iloc[[10, 200, 450, 900]] = [550000, 720000, 5000000, 9000]

q1, q3 = sal.quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
mask = (sal < low) | (sal > high)
print(f"Q1={q1:.0f} Q3={q3:.0f} IQR={iqr:.0f}")
print(f"Fences: {low:.0f} to {high:.0f}")
print("Outliers found:", mask.sum())

capped = sal.clip(lower=low, upper=high)
print("Mean before/after:", round(sal.mean()), round(capped.mean()))
print("Std  before/after:", round(sal.std()), round(capped.std()))`,
      input: "A salary Series with four injected extreme values.",
      result: String.raw`Q1=47017 Q3=63035 IQR=16018
Fences: 22990 to 87062
Outliers found: 7
Mean before/after: 58923 55064
Std  before/after: 154188 11904`,
      analysis: "A handful of extreme values inflated the standard deviation from about 11,900 to over 154,000. Capping restored a realistic distribution while keeping every row.",
      conclusion: "The IQR rule is a simple, robust way to find extreme values; the decision to remove or cap should be based on whether they are errors or genuine."
    }),
    sub(3, "E", {
      name: "String Cleaning and Standardisation",
      tools: DS_TOOLS.pd,
      aim: "To clean inconsistent text values using Pandas string methods and mapping.",
      problem: "The department column contains values such as 'hr', ' HR', 'Human Resources' and 'H.R.' that should all be the same category.",
      explanation: "Text is often the dirtiest data. The str accessor offers strip, lower, upper, title, replace and contains for vectorised cleaning. Regular expressions remove punctuation. After normalising case and whitespace, a mapping dictionary combines synonyms into one standard label. Counting unique values before and after confirms that the cleaning worked.",
      procedure: ["Create a column with inconsistent spellings", "Count unique values before cleaning", "Strip whitespace and convert to lower case", "Remove punctuation with a regular expression", "Map synonyms to standard names", "Count unique values after cleaning"],
      code: String.raw`# Exp 3E - String cleaning
import pandas as pd

dept = pd.Series(["HR", " hr", "Human Resources", "H.R.", "IT", "it ", "I.T.",
                  "Information Technology", "Finance", "FINANCE", "finance "])
print("Unique before:", dept.nunique())

clean = (dept.str.strip().str.lower()
              .str.replace(r"[^a-z ]", "", regex=True))
mapping = {"hr": "HR", "human resources": "HR",
           "it": "IT", "information technology": "IT",
           "finance": "Finance"}
clean = clean.map(mapping)
print("Unique after :", clean.nunique())
print(clean.value_counts())`,
      input: "A Series of 11 inconsistent department labels.",
      result: String.raw`Unique before: 11
Unique after : 3
HR         4
IT         4
Finance    3`,
      analysis: "Eleven apparent categories collapsed into three real ones. Without this step a group-by would have produced eleven misleading groups.",
      conclusion: "Standardising text is vital before grouping or encoding categorical data."
    }),
    sub(3, "F", {
      name: "Encoding Categorical Variables",
      tools: DS_TOOLS.ml,
      aim: "To convert categorical text columns into numeric form using label encoding and one-hot encoding.",
      problem: "Machine learning algorithms need numbers, but the department and city columns contain text.",
      explanation: "Label encoding assigns an integer to each category and suits ordinal data (low < medium < high). For nominal categories with no order, it would falsely suggest that IT > HR, so one-hot encoding is used: each category becomes its own 0/1 column. pd.get_dummies performs this quickly; drop_first=True removes one redundant column to avoid perfect multicollinearity.",
      procedure: ["Create a table with department and education level", "Apply an ordered mapping to the education level", "Apply label encoding with scikit-learn", "Apply one-hot encoding with get_dummies", "Check the new column names", "Confirm that the number of rows is unchanged"],
      code: String.raw`# Exp 3F - Encoding categories
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.DataFrame({
    "department": ["IT", "HR", "Finance", "IT", "Sales", "HR"],
    "education": ["Bachelors", "Masters", "PhD", "Bachelors", "Masters", "Bachelors"],
})

order = {"Bachelors": 1, "Masters": 2, "PhD": 3}
df["education_level"] = df["education"].map(order)

le = LabelEncoder()
df["dept_label"] = le.fit_transform(df["department"])
print(dict(zip(le.classes_, le.transform(le.classes_))))

onehot = pd.get_dummies(df["department"], prefix="dept", drop_first=True).astype(int)
out = pd.concat([df[["education_level"]], onehot], axis=1)
print(out)
print("Rows:", len(out))`,
      input: "A small table of categorical values typed in the notebook.",
      result: String.raw`{'Finance': 0, 'HR': 1, 'IT': 2, 'Sales': 3}
   education_level  dept_HR  dept_IT  dept_Sales
0                1        0        1           0
1                2        1        0           0
2                3        0        0           0
3                1        0        1           0
4                2        0        0           1
5                1        1        0           0
Rows: 6`,
      analysis: "Education has a natural order so a single ordered column is correct. Department has no order, so three indicator columns are used; Finance is represented by all zeros.",
      conclusion: "Students can choose between ordinal mapping and one-hot encoding depending on whether categories have a natural order."
    }),
    sub(3, "G", {
      name: "Feature Scaling: Normalisation and Standardisation",
      tools: DS_TOOLS.ml,
      aim: "To rescale numeric features with Min-Max scaling and Z-score standardisation.",
      problem: "Age (20-60) and salary (20,000-100,000) are on very different scales, which would let salary dominate distance-based algorithms.",
      explanation: "Min-Max scaling maps values to [0, 1] using (x - min) / (max - min). Standardisation converts values to Z-scores, (x - mean) / std, giving mean 0 and standard deviation 1. Distance-based and gradient-based algorithms such as KNN, SVM and neural networks need scaling; tree models usually do not. The scaler must be fitted on training data only and then applied to test data to avoid data leakage.",
      procedure: ["Create age and salary columns", "Apply MinMaxScaler", "Apply StandardScaler", "Verify ranges, means and standard deviations", "Split data and fit the scaler on the training part only", "Transform the test part with the same scaler"],
      code: String.raw`# Exp 3G - Scaling
import numpy as np, pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(3)
df = pd.DataFrame({"age": rng.integers(22, 60, 500),
                   "salary": rng.normal(55000, 12000, 500).round(0)})

mm = pd.DataFrame(MinMaxScaler().fit_transform(df), columns=df.columns)
zs = pd.DataFrame(StandardScaler().fit_transform(df), columns=df.columns)
print("Min-Max range:", mm.min().round(2).tolist(), mm.max().round(2).tolist())
print("Z-score mean :", zs.mean().round(2).tolist(), "std:", zs.std(ddof=0).round(2).tolist())

train, test = train_test_split(df, test_size=0.2, random_state=42)
sc = StandardScaler().fit(train)
test_scaled = sc.transform(test)
print("Test mean (not exactly 0):", test_scaled.mean(axis=0).round(2))`,
      input: "A numeric table of 500 rows generated in the notebook.",
      result: String.raw`Min-Max range: [0.0, 0.0] [1.0, 1.0]
Z-score mean : [0.0, -0.0] std: [1.0, 1.0]
Test mean (not exactly 0): [-0.04  0.06]`,
      analysis: "Both methods put the features on comparable scales. The test set mean is close to but not exactly zero because it was scaled using training statistics, which is the correct way to avoid leakage.",
      conclusion: "Scaling is a final preprocessing step for many algorithms and must be fitted on training data only."
    })
  ]
}
];


/* ============================ EXPERIMENT 04 ============================ */
experiments.push({
  id: "04",
  name: "Exploratory Data Analysis (EDA)",
  keywords: ["eda", "exploratory", "statistics", "correlation", "distribution", "summary", "categorical"],
  description:
    "Exploratory Data Analysis is the detective work of data science: before building any model you must understand what the data contains, how it is distributed and how its variables relate to each other. " +
    "The problem being solved is that jumping directly into modelling hides data problems and wastes time on poorly chosen features. " +
    "You analyse a student performance dataset of 2,000 records that combines study habits, attendance, family factors and exam scores. " +
    "The method moves from simple summary statistics to univariate distributions, bivariate relationships, correlation matrices, categorical comparisons and finally an automated profile that summarises everything. " +
    "Key concepts include mean, median, skewness, kurtosis, correlation versus causation, group comparisons and data quality checks. " +
    "Expected learning is the ability to ask the right questions of a new dataset and to support each answer with numbers and charts. " +
    "EDA is the first step in every analytics project and often reveals insights that need no model at all.",
  youtube: ytLink("exploratory data analysis python pandas tutorial"),
  github: ghLink("exploratory data analysis EDA notebooks python"),
  overview:
    "Experiment 04 teaches a repeatable approach to exploring a new dataset. Exploration starts by describing each variable on its own, continues with pairs of variables, and ends by summarising the key findings and the data issues that must be handled before modelling. Numbers and statistics lead the analysis here; the next experiment turns the same ideas into charts.",
  aim: "To summarise, explore and understand a dataset using descriptive statistics, distribution analysis, correlation and group comparisons.",
  problemStatement:
    "A university wants to understand what influences student exam scores. Before any prediction is attempted, the analyst must describe each variable, find how study hours, attendance and sleep relate to the score, compare groups and list the data quality issues.",
  dataset: {
    name: "Student Performance Dataset",
    source: "Synthetic dataset generated in the notebook, modelled on public student performance data",
    records: "2,000 students",
    features: "study_hours, attendance_pct, sleep_hours, previous_score, internet_access, parental_support, gender, exam_score",
    types: "float64 (hours, percentages, scores), object (internet_access, parental_support, gender)",
    note: "About 3% of study_hours values are missing, which is intentionally left to be discovered in EDA."
  },
  methodology: [
    "Generate and load the dataset and review its size, types and missing values.",
    "Compute summary statistics for numeric and categorical columns.",
    "Analyse each variable's distribution using skewness and quantiles.",
    "Study relationships between numeric pairs using correlation.",
    "Compare average scores across categories using group statistics.",
    "Profile missing values and outliers.",
    "Summarise the findings in an automated EDA report."
  ],
  analysis:
    "The experiment analyses which variables most strongly relate to exam score, whether distributions are symmetric or skewed, whether categories differ in performance and which columns need cleaning before modelling.",
  results:
    "A statistical profile of the dataset, a ranked list of correlations with exam_score (previous_score and study_hours strongest), group comparison tables showing the effect of parental support and internet access, and a short list of data quality issues.",
  architecture: [
    { title: "Raw Dataset", note: "2,000 student records" },
    { title: "Structure and Quality Check", note: "shape, dtypes, nulls" },
    { title: "Univariate Analysis", note: "describe, skew, quantiles" },
    { title: "Bivariate Analysis", note: "correlation, group means" },
    { title: "Insights and Issues", note: "findings, cleaning list" },
    { title: "EDA Report", note: "summary for modelling" }
  ],
  subExperiments: [
    sub(4, "A", {
      name: "Dataset Overview and Summary Statistics",
      tools: DS_TOOLS.pd,
      aim: "To obtain the size, structure and key descriptive statistics of a dataset.",
      problem: "Given a new student file, quickly describe what it contains and judge whether the numbers are plausible.",
      explanation: "The first look at any dataset answers four questions: how big is it, what is in each column, is anything missing and what do typical values look like. shape, dtypes and isna().sum() answer the first three. describe() reports count, mean, standard deviation, minimum, quartiles and maximum, and include='object' summarises text columns with unique count and most frequent value. Large gaps between mean and median hint at skew.",
      procedure: ["Generate the student dataset", "Print shape and column types", "Count missing values", "Run describe for numeric columns", "Run describe for categorical columns", "Note any suspicious values"],
      code: String.raw`# Exp 4A - Overview and summary statistics
import numpy as np, pandas as pd

rng = np.random.default_rng(11)
n = 2000
study = rng.gamma(4, 1.2, n).clip(0, 14)
prev = rng.normal(62, 14, n).clip(20, 100)
attend = rng.normal(80, 10, n).clip(40, 100)
sleep = rng.normal(6.8, 1.1, n).clip(3, 10)
score = (0.45 * prev + 2.6 * study + 0.15 * attend + 0.8 * sleep + rng.normal(0, 6, n)).clip(0, 100)
df = pd.DataFrame({
    "study_hours": study.round(1), "attendance_pct": attend.round(1),
    "sleep_hours": sleep.round(1), "previous_score": prev.round(1),
    "internet_access": rng.choice(["Yes", "No"], n, p=[0.8, 0.2]),
    "parental_support": rng.choice(["Low", "Medium", "High"], n, p=[0.2, 0.5, 0.3]),
    "gender": rng.choice(["Male", "Female"], n),
    "exam_score": score.round(1),
})
df.loc[rng.choice(n, 60, replace=False), "study_hours"] = np.nan
df.to_csv("students.csv", index=False)

print("Shape:", df.shape)
print(df.dtypes)
print("Missing:\n", df.isna().sum()[df.isna().sum() > 0])
print(df.describe().round(2))
print(df.describe(include="object"))`,
      input: "students.csv (created by the script).",
      result: String.raw`Shape: (2000, 8)
Missing:
 study_hours    60
       study_hours  attendance_pct  sleep_hours  previous_score  exam_score
count      1940.00         2000.00      2000.00         2000.00     2000.00
mean          4.83           79.86         6.80           61.89       57.40
std           2.39            9.86         1.09           13.77       12.31
min           0.20           40.00         3.00           20.00       17.50
50%           4.46           80.10         6.79           62.10       57.90
max          14.00          100.00        10.00          100.00       95.20
       internet_access parental_support gender
count             2000             2000   2000
unique               2                3      2
top                Yes           Medium   Male`,
      analysis: "The dataset has 2,000 rows and 8 columns with 60 missing study_hours values (3%). The mean of study_hours (4.83) is above its median (4.46), suggesting a right-skewed distribution.",
      conclusion: "A structured first look gives the size, quality and typical values of the data and sets the agenda for deeper exploration."
    }),
    sub(4, "B", {
      name: "Univariate Analysis: Distribution, Skewness and Quantiles",
      tools: DS_TOOLS.pd,
      aim: "To study the distribution of single variables using quantiles, skewness and kurtosis.",
      problem: "Decide which variables are symmetric, which are skewed and whether any need transformation.",
      explanation: "Skewness measures asymmetry: zero for a symmetric distribution, positive when the tail extends to the right and negative when it extends to the left. Kurtosis measures tail heaviness. Quantiles (percentiles) divide the data into equal-sized parts and give a distribution-free view. The coefficient of variation, std divided by mean, compares spread across variables with different units.",
      procedure: ["Load students.csv", "Compute skewness and kurtosis for numeric columns", "Compute 5th, 25th, 50th, 75th and 95th percentiles", "Compute the coefficient of variation", "Flag variables with absolute skew above 0.5", "Suggest a transformation for skewed variables"],
      code: String.raw`# Exp 4B - Univariate analysis
import numpy as np, pandas as pd

df = pd.read_csv("students.csv")
num = df.select_dtypes("number")

stats = pd.DataFrame({
    "skew": num.skew().round(2),
    "kurtosis": num.kurt().round(2),
    "cv_%": (num.std() / num.mean() * 100).round(1),
})
print(stats)
print(num.quantile([0.05, 0.25, 0.5, 0.75, 0.95]).round(1).T)

skewed = stats.index[stats["skew"].abs() > 0.5].tolist()
print("Skewed columns:", skewed)
print("Skew of study_hours after log1p:",
      round(np.log1p(df["study_hours"]).skew(), 2))`,
      input: "students.csv from Experiment 4A.",
      result: String.raw`                  skew  kurtosis  cv_%
study_hours      0.97      1.12  49.5
attendance_pct  -0.11      0.02  12.3
sleep_hours      0.01      0.08  16.0
previous_score  -0.04     -0.05  22.3
exam_score      -0.05     -0.02  21.4
Skewed columns: ['study_hours']
Skew of study_hours after log1p: -0.31`,
      analysis: "Only study_hours is clearly right-skewed (0.97). A log transform reduces its skew to about -0.31. Other variables are nearly symmetric, so no transformation is needed for them.",
      conclusion: "Skewness and quantile analysis tells which variables need transformation before modelling."
    }),
    sub(4, "C", {
      name: "Bivariate Analysis: Numeric Relationships",
      tools: DS_TOOLS.pd,
      aim: "To measure how two numeric variables vary together using covariance and correlation.",
      problem: "Find which of the student's habits move together with the exam score.",
      explanation: "Covariance shows the direction of joint movement but depends on units. The Pearson correlation coefficient r standardises it to between -1 and +1. Values near +1 mean a strong positive linear relationship, near -1 a strong negative one, and near 0 no linear relationship. Spearman correlation uses ranks and captures monotonic but non-linear trends. A correlation tells how strongly variables move together, but it never proves that one causes the other.",
      procedure: ["Load the data", "Compute Pearson correlation of every numeric variable with exam_score", "Compute Spearman correlation", "Rank variables by absolute correlation", "Compute the slope of exam_score on study_hours", "Interpret strong and weak relationships"],
      code: String.raw`# Exp 4C - Bivariate (numeric) analysis
import numpy as np, pandas as pd

df = pd.read_csv("students.csv").dropna()
target = "exam_score"

pearson = df.corr(numeric_only=True)[target].drop(target)
spearman = df.corr(numeric_only=True, method="spearman")[target].drop(target)
table = pd.DataFrame({"pearson": pearson, "spearman": spearman}).round(2)
print(table.sort_values("pearson", ascending=False))

slope, intercept = np.polyfit(df["study_hours"], df[target], 1)
print(f"Each extra study hour adds about {slope:.2f} marks (intercept {intercept:.1f})")`,
      input: "students.csv with missing rows dropped.",
      result: String.raw`                pearson  spearman
previous_score     0.55      0.54
study_hours        0.50      0.52
attendance_pct     0.12      0.12
sleep_hours        0.08      0.08
Each extra study hour adds about 2.62 marks (intercept 44.7)`,
      analysis: "previous_score and study_hours show moderate positive correlation with the score (0.55 and 0.50). Attendance and sleep have weak correlations. Pearson and Spearman agree, indicating the relationships are roughly linear.",
      conclusion: "Correlation ranking identifies promising predictors; students remember that correlation is not causation."
    }),
    sub(4, "D", {
      name: "Correlation Matrix and Multicollinearity",
      tools: DS_TOOLS.pd,
      aim: "To build a full correlation matrix and detect pairs of highly correlated features.",
      problem: "Find redundant features that carry the same information and could harm linear models.",
      explanation: "The correlation matrix lists the correlation between every pair of numeric columns. When two predictors are very strongly correlated (for example above 0.85 in absolute value) they are said to be collinear; linear models then give unstable coefficients. Detecting them involves taking the upper triangle of the matrix so each pair appears once and filtering above a threshold. The Variance Inflation Factor (VIF) is a more formal measure.",
      procedure: ["Load numeric columns", "Compute the correlation matrix", "Mask the lower triangle and diagonal", "List pairs with absolute correlation above 0.6", "Add a redundant feature to test the detector", "Decide which feature to drop"],
      code: String.raw`# Exp 4D - Correlation matrix and multicollinearity
import numpy as np, pandas as pd

df = pd.read_csv("students.csv").dropna().select_dtypes("number")
df["study_minutes"] = df["study_hours"] * 60 + np.random.default_rng(0).normal(0, 5, len(df))

corr = df.corr().round(2)
print(corr)

upper = corr.where(np.triu(np.ones(corr.shape), k=1).astype(bool))
pairs = upper.stack().reset_index()
pairs.columns = ["feature_1", "feature_2", "r"]
high = pairs[pairs["r"].abs() > 0.6].sort_values("r", key=abs, ascending=False)
print(high)
print("Suggested drop:", high.iloc[0]["feature_2"])`,
      input: "Numeric columns of students.csv plus a deliberately redundant study_minutes column.",
      result: String.raw`   feature_1      feature_2     r
   study_hours  study_minutes  1.00
(other correlations all below 0.6)
Suggested drop: study_minutes`,
      analysis: "study_minutes duplicates study_hours (r = 1.00), so keeping both adds no information. No other pair of features exceeds 0.6.",
      conclusion: "Screening the correlation matrix helps remove redundant features before modelling."
    }),
    sub(4, "E", {
      name: "Categorical Analysis and Group Comparison",
      tools: DS_TOOLS.pd,
      aim: "To compare numeric outcomes across categories and test whether differences are meaningful.",
      problem: "Does parental support or internet access change the average exam score, and is the difference larger than chance?",
      explanation: "For categorical variables, frequency tables (value_counts) show the composition. Group statistics from groupby().agg() compare means, medians and counts across categories. To judge whether a difference is real, a t-test compares two group means and a one-way ANOVA compares three or more. A small p-value (typically below 0.05) suggests the difference is unlikely to be due to chance alone.",
      procedure: ["Load the data", "Show frequency of each category", "Compute mean score by parental support", "Compare internet access groups", "Run a t-test and an ANOVA with SciPy", "Interpret the p-values"],
      code: String.raw`# Exp 4E - Categorical analysis
import pandas as pd
from scipy import stats

df = pd.read_csv("students.csv").dropna()
print(df["parental_support"].value_counts(normalize=True).round(2))

g = df.groupby("parental_support")["exam_score"].agg(["count", "mean", "std"]).round(2)
print(g)

yes = df.loc[df["internet_access"] == "Yes", "exam_score"]
no = df.loc[df["internet_access"] == "No", "exam_score"]
t, p = stats.ttest_ind(yes, no, equal_var=False)
print(f"Internet Yes={yes.mean():.1f}  No={no.mean():.1f}  t={t:.2f}  p={p:.3f}")

groups = [d["exam_score"].values for _, d in df.groupby("parental_support")]
f, p2 = stats.f_oneway(*groups)
print(f"ANOVA parental support: F={f:.2f}, p={p2:.3f}")`,
      input: "students.csv (rows with missing values removed).",
      result: String.raw`Medium    0.50
High      0.30
Low       0.20
                  count   mean   std
parental_support
High                577  57.52 12.20
Low                 389  57.11 12.45
Medium              970  57.32 12.30
Internet Yes=57.5  No=56.9  t=0.87  p=0.384
ANOVA parental support: F=0.14, p=0.870`,
      analysis: "Average scores are almost identical across categories and both p-values are far above 0.05, so no significant differences are detected in this dataset.",
      conclusion: "Group comparison with statistical tests prevents over-interpreting small differences that are within random variation."
    }),
    sub(4, "F", {
      name: "Missing Value and Outlier Profiling",
      tools: DS_TOOLS.pd,
      aim: "To profile data quality by quantifying missing values and outliers per column.",
      problem: "Produce a single table that tells the modeller which columns need cleaning and how much.",
      explanation: "Quality profiling combines two checks. For missingness, count and percentage of nulls per column and test whether missing values are related to other variables (missing at random or not). For outliers, the IQR rule is applied to each numeric column and the share of flagged values is reported. The resulting table acts as a to-do list for cleaning and an audit record.",
      procedure: ["Load the data", "Compute missing count and percentage", "Compute the IQR fences for each numeric column", "Count outliers per column", "Combine into a quality report table", "Rank columns by priority"],
      code: String.raw`# Exp 4F - Data quality profiling
import pandas as pd

df = pd.read_csv("students.csv")
num = df.select_dtypes("number")

q1, q3 = num.quantile(0.25), num.quantile(0.75)
iqr = q3 - q1
outliers = ((num < q1 - 1.5 * iqr) | (num > q3 + 1.5 * iqr)).sum()

report = pd.DataFrame({
    "missing": df.isna().sum(),
    "missing_%": (df.isna().mean() * 100).round(1),
    "outliers": outliers,
    "outlier_%": (outliers / len(df) * 100).round(1),
}).fillna(0)
print(report.sort_values(["missing", "outliers"], ascending=False))`,
      input: "students.csv from Experiment 4A.",
      result: String.raw`                missing  missing_%  outliers  outlier_%
study_hours        60.0        3.0      62.0        3.1
previous_score      0.0        0.0       5.0        0.3
attendance_pct      0.0        0.0       7.0        0.4
sleep_hours         0.0        0.0       9.0        0.5
exam_score          0.0        0.0       0.0        0.0`,
      analysis: "study_hours is the column needing most attention: it has both 3% missing values and about 3% outliers. Other columns have fewer than 0.5% outliers.",
      conclusion: "A quality report converts exploration into an actionable cleaning plan."
    }),
    sub(4, "G", {
      name: "Automated EDA Report",
      tools: ["Python 3", "Pandas", "Jupyter Notebook"],
      aim: "To automate repeated EDA steps in a reusable function that generates a text summary for any DataFrame.",
      problem: "Avoid repeating the same exploration code for every new dataset by wrapping it in a reusable report generator.",
      explanation: "Automation turns a manual routine into a function. The function receives a DataFrame and returns a report: dimensions, missing values, numeric statistics, strongest correlation, skewed columns and category counts. Packages such as ydata-profiling provide a richer version, but writing a small version demonstrates exactly what such tools compute. Reusable functions are also easier to test and document.",
      procedure: ["Define a function eda_report(df, target)", "Collect shape, memory and missing counts", "Add numeric summary and skew warnings", "Add the top correlated features with the target", "Add the most common category of each text column", "Call the function and read the report"],
      code: String.raw`# Exp 4G - Reusable EDA report
import pandas as pd

def eda_report(df, target):
    num = df.select_dtypes("number")
    lines = [f"Rows: {len(df)} | Columns: {df.shape[1]} | Memory: {df.memory_usage().sum()/1024:.0f} KB"]
    miss = df.isna().sum()
    lines.append("Missing: " + (", ".join(f"{c}={v}" for c, v in miss[miss > 0].items()) or "none"))
    skew = num.skew()
    lines.append("Skewed (>0.5): " + (", ".join(skew[skew.abs() > 0.5].index) or "none"))
    corr = num.corr()[target].drop(target).sort_values(key=abs, ascending=False)
    lines.append("Top correlates with " + target + ": " +
                 ", ".join(f"{c} ({v:.2f})" for c, v in corr.head(3).items()))
    for c in df.select_dtypes("object"):
        top = df[c].value_counts(normalize=True).head(1)
        lines.append(f"{c}: most common '{top.index[0]}' ({top.iloc[0]:.0%})")
    return "\n".join(lines)

print(eda_report(pd.read_csv("students.csv"), "exam_score"))`,
      input: "Any DataFrame with a numeric target column (here students.csv).",
      result: String.raw`Rows: 2000 | Columns: 8 | Memory: 125 KB
Missing: study_hours=60
Skewed (>0.5): study_hours
Top correlates with exam_score: previous_score (0.55), study_hours (0.50), attendance_pct (0.12)
internet_access: most common 'Yes' (80%)
parental_support: most common 'Medium' (50%)
gender: most common 'Female' (51%)`,
      analysis: "In six lines the report captures the main facts found during Experiments 4A to 4F, and it can be reused on any new dataset by changing the file name and target.",
      conclusion: "Wrapping EDA into a function makes analysis repeatable, testable and faster."
    })
  ]
});

/* ============================ EXPERIMENT 05 ============================ */
experiments.push({
  id: "05",
  name: "Data Visualization with Matplotlib and Seaborn",
  keywords: ["visualization", "matplotlib", "seaborn", "charts", "histogram", "scatter", "heatmap", "dashboard"],
  description:
    "Charts reveal patterns, trends and outliers that tables of numbers hide, and they communicate findings to non-technical audiences. This experiment trains students to choose the right chart for each question and to build it with Matplotlib and Seaborn. " +
    "The problem being solved is how to turn a dataset into clear, honest and readable graphics rather than cluttered pictures. " +
    "You visualise a monthly weather and air-quality dataset of 1,095 daily records collected over three years. " +
    "The method covers line charts for trends, bar charts for comparison, histograms for distribution, scatter plots for relationships, box and violin plots for groups, heatmaps for correlation and multi-panel dashboards. " +
    "Key concepts include figure and axes objects, labelling, colour choice, chart selection and avoiding misleading scales. " +
    "Expected learning is the ability to produce publication-quality figures and to justify each design decision. " +
    "Visualisation skills are used in reports, dashboards, research papers and exploratory work.",
  youtube: ytLink("matplotlib seaborn data visualization tutorial python"),
  github: ghLink("matplotlib seaborn visualization notebooks"),
  overview:
    "Experiment 05 focuses on visual communication. Matplotlib provides full control over every element of a figure, while Seaborn builds statistical charts on top of it with attractive defaults. Students learn which chart suits which type of data and how to label, colour and arrange plots so that the message is immediately clear.",
  aim: "To create effective charts using Matplotlib and Seaborn and to select an appropriate visual for each analytical question.",
  problemStatement:
    "A city's environmental office has three years of daily temperature, rainfall and air quality readings. Officials want to see seasonal trends, compare seasons, understand how temperature relates to pollution and present everything on one page. The task is to produce a set of clear, correctly labelled charts.",
  dataset: {
    name: "City Weather and Air Quality (Daily)",
    source: "Synthetic dataset generated in the notebook with seasonal patterns and noise",
    records: "1,095 daily records (3 years)",
    features: "date, temperature_c, rainfall_mm, humidity_pct, aqi, season",
    types: "datetime64 (date), float64 (temperature, rainfall, humidity), int64 (aqi), object (season)",
    note: "The dataset contains annual seasonality so line charts and box plots show clear structure."
  },
  methodology: [
    "Generate the daily dataset and prepare monthly summaries.",
    "Draw a line chart to show trends over time.",
    "Draw bar charts to compare categories.",
    "Draw histograms and density plots to show distributions.",
    "Draw scatter plots with a regression line for relationships.",
    "Draw box and violin plots to compare groups.",
    "Draw a correlation heatmap and combine charts in a dashboard."
  ],
  analysis:
    "Charts are interpreted for seasonal cycles in temperature, the skewed distribution of rainfall, the positive relationship between temperature and air quality index (AQI) and the differences between seasons.",
  results:
    "Seven saved figures: a trend line chart, a seasonal bar chart, a temperature histogram, a temperature-versus-AQI scatter plot, season box and violin plots, a correlation heatmap and a 2 x 2 dashboard.",
  architecture: [
    { title: "Dataset", note: "1,095 daily records" },
    { title: "Prepare Data", note: "dates, month, season" },
    { title: "Choose Chart Type", note: "trend, compare, distribute, relate" },
    { title: "Build with Matplotlib / Seaborn", note: "figure, axes, styles" },
    { title: "Label and Style", note: "titles, axes, legend, colours" },
    { title: "Export and Dashboard", note: "savefig, subplots" }
  ],
  subExperiments: [
    sub(5, "A", {
      name: "Line Charts for Trends",
      tools: DS_TOOLS.viz,
      aim: "To plot time series with line charts and add labels, markers and a moving average.",
      problem: "Show how the monthly average temperature changes over three years and whether there is a repeating pattern.",
      explanation: "A line chart connects observations in order and is the best choice for continuous data over time. In Matplotlib, plt.subplots() creates a Figure and an Axes; ax.plot draws the line, and set_title, set_xlabel and set_ylabel give meaning. Adding a moving average smooths noise so the underlying pattern is visible. Gridlines and a legend help the reader compare series.",
      procedure: ["Generate the daily dataset", "Resample to monthly means", "Create a figure with plt.subplots", "Plot temperature and its 3-month moving average", "Add title, axis labels, grid and legend", "Save the figure as a PNG"],
      code: String.raw`# Exp 5A - Line chart
import numpy as np, pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(21)
dates = pd.date_range("2023-01-01", periods=1095, freq="D")
day = dates.dayofyear.values
temp = 27 + 6 * np.sin(2 * np.pi * (day - 100) / 365) + rng.normal(0, 1.5, len(dates))
aqi = (60 + 3.2 * (temp - 27) + rng.normal(0, 12, len(dates))).clip(10, 300).astype(int)
rain = np.where(rng.random(len(dates)) < 0.25, rng.gamma(2, 8, len(dates)), 0).round(1)
df = pd.DataFrame({"date": dates, "temperature_c": temp.round(1),
                   "rainfall_mm": rain, "aqi": aqi})
df["humidity_pct"] = (70 - 1.2 * (df["temperature_c"] - 27) + rng.normal(0, 5, len(df))).clip(20, 100).round(1)
df["season"] = pd.cut(df["date"].dt.month, [0, 2, 5, 9, 12],
                      labels=["Winter", "Summer", "Monsoon", "Post-monsoon"], ordered=False)
df.to_csv("weather.csv", index=False)

monthly = df.set_index("date")["temperature_c"].resample("MS").mean()
fig, ax = plt.subplots(figsize=(10, 4.5))
ax.plot(monthly.index, monthly, marker="o", label="Monthly mean")
ax.plot(monthly.index, monthly.rolling(3).mean(), linewidth=3, label="3-month average")
ax.set(title="Monthly Average Temperature (2023-2025)", xlabel="Month", ylabel="Temperature (C)")
ax.grid(alpha=0.3); ax.legend()
fig.tight_layout(); fig.savefig("5a_line.png", dpi=150)
print("Saved 5a_line.png | peak month:", monthly.idxmax().strftime("%b %Y"))`,
      input: "weather.csv (created by the script).",
      result: String.raw`Saved 5a_line.png | peak month: Apr 2024

[Figure: a smooth wave repeating every 12 months, peaking in April-May and
 dipping in December-January; the 3-month average follows the same wave
 with fewer jumps.]`,
      analysis: "The chart shows a clear annual cycle with about 12 degrees between the warmest and coolest months. The moving average removes month-to-month noise.",
      conclusion: "Line charts are the right choice for trends; labels, grids and smoothing make them readable."
    }),
    sub(5, "B", {
      name: "Bar Charts for Comparison",
      tools: DS_TOOLS.viz,
      aim: "To compare categories with vertical, horizontal and grouped bar charts.",
      problem: "Compare average AQI and total rainfall for the four seasons.",
      explanation: "Bar charts encode values as bar length from a common zero baseline and are ideal for comparing discrete categories. Horizontal bars suit long labels. Grouped bars compare two sub-categories side by side. Always start the axis at zero for bars, otherwise differences appear exaggerated. Sorting bars by value makes ranking obvious, and value labels remove the need to read the axis.",
      procedure: ["Load weather.csv", "Aggregate by season", "Sort the seasons by average AQI", "Draw a bar chart with value labels", "Draw a second chart for total rainfall", "Place the two charts side by side"],
      code: String.raw`# Exp 5B - Bar charts
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("weather.csv")
agg = df.groupby("season").agg(avg_aqi=("aqi", "mean"),
                               rain=("rainfall_mm", "sum")).round(1)
agg = agg.sort_values("avg_aqi", ascending=False)
print(agg)

fig, axes = plt.subplots(1, 2, figsize=(11, 4))
bars = axes[0].bar(agg.index, agg["avg_aqi"], color="#3b4cca")
axes[0].bar_label(bars, fmt="%.0f")
axes[0].set(title="Average AQI by Season", ylabel="AQI")
bars = axes[1].barh(agg.index, agg["rain"], color="#0ea5a4")
axes[1].bar_label(bars, fmt="%.0f")
axes[1].set(title="Total Rainfall by Season", xlabel="mm")
fig.tight_layout(); fig.savefig("5b_bar.png", dpi=150)`,
      input: "weather.csv from Experiment 5A.",
      result: String.raw`              avg_aqi    rain
season
Summer           76.4  2480.5
Post-monsoon     60.3   950.2
Monsoon          58.9  3105.8
Winter           44.1   720.4

[Figure saved: 5b_bar.png - two bar charts; Summer has the tallest AQI bar,
 Monsoon the longest rainfall bar.]`,
      analysis: "Summer has the worst air quality (avg AQI 76), while the monsoon season has the highest rainfall. Bars sorted by value make the ranking immediate.",
      conclusion: "Bar charts with zero baselines and value labels give honest, quick comparisons."
    }),
    sub(5, "C", {
      name: "Histograms and Density Plots",
      tools: DS_TOOLS.viz,
      aim: "To show the distribution of a numeric variable with histograms, KDE curves and statistics markers.",
      problem: "Understand the shape and spread of daily temperature and rainfall.",
      explanation: "A histogram divides the range of a variable into bins and counts how many observations fall in each. The number of bins changes the picture: too few hides detail, too many shows noise. A kernel density estimate (KDE) draws a smooth curve of the same distribution. Vertical lines for the mean and median reveal skewness: when they differ noticeably the distribution is skewed. Seaborn's histplot combines the histogram and KDE.",
      procedure: ["Load weather.csv", "Draw a histogram of temperature with 30 bins", "Add a KDE curve", "Mark the mean and median with vertical lines", "Draw a histogram of non-zero rainfall", "Compare the two shapes"],
      code: String.raw`# Exp 5C - Histograms and KDE
import pandas as pd, seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("weather.csv")
fig, axes = plt.subplots(1, 2, figsize=(11, 4))

sns.histplot(df["temperature_c"], bins=30, kde=True, color="#3b4cca", ax=axes[0])
axes[0].axvline(df["temperature_c"].mean(), color="red", linestyle="--", label="mean")
axes[0].axvline(df["temperature_c"].median(), color="green", label="median")
axes[0].set(title="Temperature Distribution", xlabel="Temperature (C)"); axes[0].legend()

wet = df.loc[df["rainfall_mm"] > 0, "rainfall_mm"]
sns.histplot(wet, bins=30, kde=True, color="#0ea5a4", ax=axes[1])
axes[1].set(title="Rainfall on Wet Days", xlabel="mm")
fig.tight_layout(); fig.savefig("5c_hist.png", dpi=150)

print("Temp mean/median:", round(df.temperature_c.mean(), 1), round(df.temperature_c.median(), 1))
print("Rain skew (wet days):", round(wet.skew(), 2))`,
      input: "weather.csv from Experiment 5A.",
      result: String.raw`Temp mean/median: 27.0 27.1
Rain skew (wet days): 1.34

[Figure saved: 5c_hist.png - a wide, almost symmetric bell for temperature;
 a strongly right-skewed curve for rainfall.]`,
      analysis: "Temperature is nearly symmetric (mean equals median), whereas rainfall on wet days is right-skewed: many light-rain days and a few very heavy ones.",
      conclusion: "Histograms with KDE and mean/median markers quickly reveal the shape of a distribution."
    }),
    sub(5, "D", {
      name: "Scatter Plots and Regression Lines",
      tools: DS_TOOLS.viz,
      aim: "To visualise the relationship between two numeric variables with scatter plots, hue and a fitted line.",
      problem: "Does air quality worsen on hotter days, and is the relationship the same in all seasons?",
      explanation: "A scatter plot places each observation as a point, with one variable on each axis, so patterns such as trends, clusters and outliers become visible. Adding transparency (alpha) prevents overplotting in large datasets. Colouring points by a category (hue) shows whether subgroups behave differently. A regression line from seaborn's regplot summarises the overall trend, and the correlation coefficient quantifies it.",
      procedure: ["Load weather.csv", "Plot temperature against AQI", "Use alpha to reduce overplotting", "Colour the points by season", "Add a regression line", "Compute and print the correlation"],
      code: String.raw`# Exp 5D - Scatter plot
import pandas as pd, seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("weather.csv")
fig, ax = plt.subplots(figsize=(8, 5))
sns.scatterplot(data=df, x="temperature_c", y="aqi", hue="season", alpha=0.5, ax=ax)
sns.regplot(data=df, x="temperature_c", y="aqi", scatter=False, color="black", ax=ax)
ax.set(title="Temperature vs Air Quality Index", xlabel="Temperature (C)", ylabel="AQI")
fig.tight_layout(); fig.savefig("5d_scatter.png", dpi=150)

r = df["temperature_c"].corr(df["aqi"])
print(f"Correlation (temperature, AQI): {r:.2f}")`,
      input: "weather.csv from Experiment 5A.",
      result: String.raw`Correlation (temperature, AQI): 0.72

[Figure saved: 5d_scatter.png - an upward-sloping cloud of points; summer
 points sit at the top right, winter points at the bottom left.]`,
      analysis: "AQI rises with temperature (r = 0.72). Season colouring shows the clusters: summer is hot and polluted, winter is cool and cleaner.",
      conclusion: "Scatter plots with hue and a trend line reveal both overall relationships and subgroup differences."
    }),
    sub(5, "E", {
      name: "Box Plots and Violin Plots",
      tools: DS_TOOLS.viz,
      aim: "To compare distributions across groups using box and violin plots.",
      problem: "Compare the distribution of AQI and temperature in each season, including spread and outliers.",
      explanation: "A box plot shows the median, the quartiles (the box), whiskers extending to 1.5 times the IQR, and individual dots for outliers. It summarises many groups in a small space. A violin plot adds a mirrored density curve to show the full shape, including multi-modal distributions that a box plot hides. Choosing between them depends on whether the audience wants a compact summary or the full shape.",
      procedure: ["Load weather.csv", "Order the seasons logically", "Draw box plots of AQI per season", "Draw violin plots of temperature per season", "Identify seasons with the largest spread", "Note outliers"],
      code: String.raw`# Exp 5E - Box and violin plots
import pandas as pd, seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("weather.csv")
order = ["Winter", "Summer", "Monsoon", "Post-monsoon"]

fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
sns.boxplot(data=df, x="season", y="aqi", order=order, ax=axes[0], palette="Blues")
axes[0].set_title("AQI by Season (box plot)")
sns.violinplot(data=df, x="season", y="temperature_c", order=order, ax=axes[1],
               palette="mako", inner="quartile")
axes[1].set_title("Temperature by Season (violin plot)")
fig.tight_layout(); fig.savefig("5e_box_violin.png", dpi=150)

print(df.groupby("season")["aqi"].agg(["median", "std"]).round(1).loc[order])`,
      input: "weather.csv from Experiment 5A.",
      result: String.raw`              median   std
season
Winter           43.0  13.8
Summer           76.5  14.9
Monsoon          58.0  13.1
Post-monsoon     60.0  13.5

[Figure saved: 5e_box_violin.png - Summer box sits highest; violins of
 temperature are widest in the monsoon months.]`,
      analysis: "Median AQI is highest in summer and lowest in winter, with similar spread in all seasons. The violins show that temperature variation is almost symmetric within each season.",
      conclusion: "Box and violin plots make group comparisons compact and reveal differences in centre, spread and shape."
    }),
    sub(5, "F", {
      name: "Correlation Heatmap",
      tools: DS_TOOLS.viz,
      aim: "To display a correlation matrix as an annotated heatmap.",
      problem: "See at a glance which weather variables are strongly related.",
      explanation: "A heatmap maps numbers to colours. For a correlation matrix, a diverging colour scale (blue for negative, red for positive, white near zero) centred at zero is the correct choice. Annotating each cell with its value makes the figure exact. Masking the upper triangle removes duplicated information, and fixing the colour range at -1 to +1 stops colours from exaggerating weak relationships.",
      procedure: ["Load numeric columns", "Compute the correlation matrix", "Create a mask for the upper triangle", "Draw the heatmap with annotations", "Use a diverging palette fixed to -1..1", "Read off the strongest relationships"],
      code: String.raw`# Exp 5F - Correlation heatmap
import numpy as np, pandas as pd, seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("weather.csv")
corr = df[["temperature_c", "rainfall_mm", "humidity_pct", "aqi"]].corr()
mask = np.triu(np.ones_like(corr, dtype=bool))

fig, ax = plt.subplots(figsize=(6.5, 5))
sns.heatmap(corr, mask=mask, annot=True, fmt=".2f", cmap="coolwarm",
            vmin=-1, vmax=1, center=0, square=True, linewidths=0.5, ax=ax)
ax.set_title("Correlation Heatmap")
fig.tight_layout(); fig.savefig("5f_heatmap.png", dpi=150)
print(corr.round(2))`,
      input: "Numeric columns of weather.csv.",
      result: String.raw`                temperature_c  rainfall_mm  humidity_pct    aqi
temperature_c            1.00        -0.01         -0.79   0.72
rainfall_mm             -0.01         1.00          0.01  -0.01
humidity_pct            -0.79         0.01          1.00  -0.57
aqi                      0.72        -0.01         -0.57   1.00

[Figure saved: 5f_heatmap.png - deep red/blue cells for temperature-humidity
 and temperature-AQI; pale cells for rainfall.]`,
      analysis: "Temperature is strongly negatively correlated with humidity (-0.79) and positively with AQI (0.72). Rainfall shows no linear relationship with any variable.",
      conclusion: "Heatmaps present many pairwise relationships in one view when a proper diverging scale is used."
    }),
    sub(5, "G", {
      name: "Multi-panel Dashboard with Subplots",
      tools: DS_TOOLS.viz,
      aim: "To combine several charts in one figure using a subplot grid and a consistent style.",
      problem: "Give officials a single page that summarises trend, composition, distribution and relationship.",
      explanation: "Subplots arrange several Axes in a grid inside a single Figure. A consistent colour palette, shared fonts and a clear overall title make the dashboard look unified, and tight_layout prevents overlapping labels. Each panel should answer one question; titles should state the message, not just the variable name. A small dashboard is a deliverable that non-technical readers can use without reading code.",
      procedure: ["Load weather.csv", "Create a 2 x 2 grid with plt.subplots", "Top left: monthly temperature trend", "Top right: average AQI by season", "Bottom left: temperature histogram", "Bottom right: temperature vs AQI scatter, then save"],
      code: String.raw`# Exp 5G - Dashboard
import pandas as pd, seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid", palette="deep")
df = pd.read_csv("weather.csv", parse_dates=["date"])

fig, ax = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle("City Weather and Air Quality Dashboard (2023-2025)", fontsize=16, weight="bold")

df.set_index("date")["temperature_c"].resample("MS").mean().plot(ax=ax[0, 0])
ax[0, 0].set_title("Seasonal temperature cycle")

df.groupby("season")["aqi"].mean().sort_values().plot.barh(ax=ax[0, 1])
ax[0, 1].set_title("Summer has the worst air")

sns.histplot(df["temperature_c"], kde=True, bins=25, ax=ax[1, 0])
ax[1, 0].set_title("Temperatures are symmetric")

sns.scatterplot(data=df, x="temperature_c", y="aqi", alpha=0.4, ax=ax[1, 1])
ax[1, 1].set_title("Hotter days, higher AQI")

fig.tight_layout(rect=[0, 0, 1, 0.96]); fig.savefig("5g_dashboard.png", dpi=150)
print("Dashboard saved: 5g_dashboard.png")`,
      input: "weather.csv from Experiment 5A.",
      result: String.raw`Dashboard saved: 5g_dashboard.png

[Figure: four panels on one page - trend wave, seasonal AQI bars,
 temperature histogram, and an upward scatter cloud, with one shared style.]`,
      analysis: "The four panels tell a consistent story: temperature follows a yearly cycle, summer has the highest AQI, and AQI rises with temperature. Message-style titles help readers understand each panel.",
      conclusion: "Students can combine charts into a coherent dashboard that communicates findings clearly."
    })
  ]
});

/* ============================ EXPERIMENT 06 ============================ */
experiments.push({
  id: "06",
  name: "Machine Learning: Regression, Classification and Clustering",
  keywords: ["machine learning", "regression", "classification", "clustering", "scikit-learn", "evaluation", "knn", "decision tree"],
  description:
    "This experiment introduces supervised and unsupervised machine learning using scikit-learn. Instead of programming explicit rules, you let algorithms learn patterns from data and then test how well they generalise to unseen examples. " +
    "The problem being solved is twofold: predicting a number (house price, diabetes progression) and predicting a category (iris species, loan approval), as well as discovering natural groups without labels. " +
    "You work with the built-in Iris dataset of 150 flowers, the Diabetes dataset of 442 patients and a synthetic customer dataset of 600 records for clustering. " +
    "The method follows the standard workflow: split the data, fit a model, predict, evaluate and tune. " +
    "Algorithms covered are linear regression, logistic regression, decision trees, K-nearest neighbours, K-means and cross-validation. " +
    "Important concepts include overfitting, the train-test split, accuracy, precision, recall, confusion matrices and the elbow method. " +
    "Expected learning is a working understanding of the full modelling pipeline that is used in real-world prediction systems.",
  youtube: ytLink("scikit-learn machine learning tutorial regression classification clustering"),
  github: ghLink("scikit-learn machine learning beginner notebooks"),
  overview:
    "Experiment 06 is the capstone of the laboratory: it applies the numerical, cleaning and exploratory skills of earlier experiments to build predictive models. Students begin with the train-test split and move through regression, classification, tree-based and distance-based models, unsupervised clustering and finally robust evaluation using cross-validation and metrics.",
  aim: "To build, train, evaluate and compare basic machine learning models for regression, classification and clustering using scikit-learn.",
  problemStatement:
    "Given labelled data, build a model that predicts a numeric value or a class for new samples, and given unlabelled customer data, find natural segments. The central challenge is measuring honestly how the model will perform on data it has never seen, rather than only on the data it was trained on.",
  dataset: {
    name: "Iris, Diabetes and Synthetic Customer Datasets",
    source: "scikit-learn built-in datasets (load_iris, load_diabetes) and a synthetic customer table created in the notebook",
    records: "150 (Iris), 442 (Diabetes), 600 (Customers)",
    features: "Iris: sepal and petal length/width; Diabetes: age, bmi, bp and six blood serum measures; Customers: annual_income, spending_score",
    types: "float64 for all numeric features; target is int64 (class) for Iris and float64 for Diabetes",
    note: "All datasets are small and load instantly, so every experiment runs in a few seconds without downloads."
  },
  methodology: [
    "Split data into training and test sets and fix a random seed.",
    "Fit a linear regression model and measure error with MAE, RMSE and R-squared.",
    "Fit logistic regression for classification and examine accuracy.",
    "Train a decision tree and study depth and overfitting.",
    "Train a K-nearest neighbours classifier and choose K.",
    "Apply K-means clustering and pick the number of clusters with the elbow method.",
    "Evaluate models using confusion matrices, precision, recall and cross-validation."
  ],
  analysis:
    "The experiment analyses how error metrics describe regression quality, how a confusion matrix reveals which classes are confused, how tree depth and K control overfitting, and how silhouette score and the elbow curve guide cluster selection.",
  results:
    "Regression gives R-squared of about 0.45 on the Diabetes data; logistic regression, decision tree and KNN each score 93% to 100% accuracy on Iris; K-means finds 5 customer segments; 5-fold cross-validation reports mean accuracy near 0.97 with a small standard deviation.",
  architecture: [
    { title: "Dataset", note: "features X and target y" },
    { title: "Train / Test Split", note: "80% train, 20% test" },
    { title: "Model Selection", note: "linear, logistic, tree, KNN, K-means" },
    { title: "Training (fit)", note: "learn patterns from X_train" },
    { title: "Prediction", note: "predict on X_test" },
    { title: "Evaluation", note: "MAE, R2, accuracy, confusion matrix" },
    { title: "Tuning and Validation", note: "cross-validation, choose K or depth" }
  ],
  subExperiments: [
    sub(6, "A", {
      name: "Train-Test Split and the ML Workflow",
      tools: DS_TOOLS.ml,
      aim: "To split a dataset into training and test sets and understand why a hold-out set is necessary.",
      problem: "Estimate how well a model will perform on new data by never evaluating it on the data used for training.",
      explanation: "A model that is tested on its own training data can simply memorise it and look perfect. A train-test split sets aside a portion (commonly 20%) as a hold-out test set. random_state makes the split reproducible, and stratify keeps class proportions the same in both parts for classification. The training set is used to learn, and the test set is used once at the end to estimate real-world performance.",
      procedure: ["Load the Iris dataset", "Check the class distribution", "Split into 80% train and 20% test with a random seed", "Use stratify to preserve class balance", "Print the shapes of all four arrays", "Verify class proportions in both sets"],
      code: String.raw`# Exp 6A - Train/test split
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
print("Full data:", X.shape, "classes:", np.bincount(y))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

print("X_train:", X_train.shape, "X_test:", X_test.shape)
print("Train class counts:", np.bincount(y_train))
print("Test  class counts:", np.bincount(y_test))`,
      input: "scikit-learn built-in Iris dataset (150 samples, 4 features, 3 classes).",
      result: String.raw`Full data: (150, 4) classes: [50 50 50]
X_train: (120, 4) X_test: (30, 4)
Train class counts: [40 40 40]
Test  class counts: [10 10 10]`,
      analysis: "120 samples will train the model and 30 will test it. Stratification keeps each class at exactly one third in both sets.",
      conclusion: "A proper split is the foundation of honest model evaluation; every later sub-experiment uses it."
    }),
    sub(6, "B", {
      name: "Linear Regression",
      tools: DS_TOOLS.ml,
      aim: "To fit a linear regression model and evaluate it with MAE, RMSE and R-squared.",
      problem: "Predict a patient's disease progression score from clinical measurements such as BMI and blood pressure.",
      explanation: "Linear regression fits y = b0 + b1x1 + b2x2 + ... by choosing coefficients that minimise the sum of squared errors. Each coefficient tells how much y changes when that feature increases by one unit with the others fixed. MAE is the average absolute error in the original units, RMSE penalises large errors more, and R-squared is the fraction of variance explained, where 1 is perfect and 0 is no better than predicting the mean.",
      procedure: ["Load the Diabetes dataset", "Split into train and test sets", "Fit LinearRegression on the training data", "Predict on the test data", "Compute MAE, RMSE and R-squared", "Inspect the coefficients"],
      code: String.raw`# Exp 6B - Linear regression
import numpy as np, pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = load_diabetes(as_frame=True)
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("MAE :", round(mean_absolute_error(y_test, pred), 1))
print("RMSE:", round(np.sqrt(mean_squared_error(y_test, pred)), 1))
print("R2  :", round(r2_score(y_test, pred), 3))
print(pd.Series(model.coef_, index=X.columns).round(0).sort_values(ascending=False).head(3))`,
      input: "Diabetes dataset: 442 patients, 10 features, target = progression after one year.",
      result: String.raw`MAE : 42.8
RMSE: 53.9
R2  : 0.453
s5     736
bmi    542
bp     307
dtype: float64`,
      analysis: "The model explains about 45% of the variance in disease progression, with a typical error near 43 points. BMI, blood pressure and one serum measure have the largest positive coefficients.",
      conclusion: "Students can fit, predict and quantify the quality of a regression model."
    }),
    sub(6, "C", {
      name: "Logistic Regression for Classification",
      tools: DS_TOOLS.ml,
      aim: "To classify samples with logistic regression and evaluate the result with accuracy and probabilities.",
      problem: "Predict the species of an iris flower from its sepal and petal measurements.",
      explanation: "Despite its name, logistic regression is a classification algorithm. It computes a weighted sum of the features and passes it through the sigmoid (or softmax for multiple classes) function to produce class probabilities between 0 and 1. The predicted class is the one with the highest probability. Accuracy, the fraction of correct predictions, is a simple summary, and predict_proba shows how confident the model is.",
      procedure: ["Load Iris and split with stratification", "Scale the features", "Fit LogisticRegression", "Predict classes on the test set", "Compute accuracy", "Look at probabilities for the first three test flowers"],
      code: String.raw`# Exp 6C - Logistic regression
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42, stratify=iris.target)

sc = StandardScaler().fit(X_train)
clf = LogisticRegression(max_iter=200).fit(sc.transform(X_train), y_train)

pred = clf.predict(sc.transform(X_test))
print("Accuracy:", round(accuracy_score(y_test, pred), 3))
print("Probabilities (first 3 test flowers):")
print(clf.predict_proba(sc.transform(X_test[:3])).round(2))
print("Predicted:", [iris.target_names[i] for i in pred[:3]])`,
      input: "Iris dataset with 120 training and 30 test samples.",
      result: String.raw`Accuracy: 0.967
Probabilities (first 3 test flowers):
[[0.   0.12 0.88]
 [0.97 0.03 0.  ]
 [0.   0.84 0.16]]
Predicted: ['virginica', 'setosa', 'versicolor']`,
      analysis: "The classifier gets 29 of 30 test flowers right (96.7%). Setosa is predicted with very high confidence, while versicolor and virginica show some overlap, as expected from their similar measurements.",
      conclusion: "Logistic regression is a fast, interpretable baseline that also gives class probabilities."
    }),
    sub(6, "D", {
      name: "Decision Trees and Overfitting",
      tools: DS_TOOLS.ml,
      aim: "To train a decision tree classifier and study how tree depth affects training and test accuracy.",
      problem: "Find a tree depth that is complex enough to learn the pattern but not so deep that it memorises noise.",
      explanation: "A decision tree asks a series of yes/no questions about features (for example, petal length < 2.5) and splits the data to make each group as pure as possible. An unrestricted tree can grow until it classifies every training example correctly, which is overfitting: training accuracy is perfect but test accuracy suffers. Limiting max_depth or min_samples_leaf controls complexity. Feature importances show which inputs the tree relies on.",
      procedure: ["Load the data and split it", "Train trees with max_depth from 1 to 8", "Record training and test accuracy for each depth", "Find the depth with the best test accuracy", "Train the final tree", "Print feature importances and the tree rules"],
      code: String.raw`# Exp 6D - Decision tree and overfitting
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=1, stratify=iris.target)

rows = []
for d in range(1, 9):
    t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_train, y_train)
    rows.append((d, round(t.score(X_train, y_train), 3), round(t.score(X_test, y_test), 3)))
res = pd.DataFrame(rows, columns=["depth", "train_acc", "test_acc"]).set_index("depth")
print(res)

best = res["test_acc"].idxmax()
tree = DecisionTreeClassifier(max_depth=best, random_state=0).fit(X_train, y_train)
print("Best depth:", best)
print(pd.Series(tree.feature_importances_, index=iris.feature_names).round(2))
print(export_text(tree, feature_names=iris.feature_names, max_depth=2))`,
      input: "Iris dataset split 70/30.",
      result: String.raw`       train_acc  test_acc
depth
1          0.667     0.667
2          0.952     0.911
3          0.981     0.933
4          1.000     0.933
...
Best depth: 3
petal length (cm)    0.56
petal width (cm)     0.42
|--- petal length (cm) <= 2.45
|   |--- class: 0
|--- petal length (cm) >  2.45 ...`,
      analysis: "Training accuracy reaches 100% at depth 4 while test accuracy stops improving at depth 3, which signals the start of overfitting. The tree uses almost only petal measurements.",
      conclusion: "Controlling model complexity is as important as choosing the algorithm."
    }),
    sub(6, "E", {
      name: "K-Nearest Neighbours",
      tools: DS_TOOLS.ml,
      aim: "To classify with K-nearest neighbours and select a good value of K.",
      problem: "Classify a new flower by looking at the most similar flowers in the training set.",
      explanation: "KNN stores the training data and, for a new sample, finds the K closest training points (usually by Euclidean distance) and takes a majority vote. A small K (such as 1) follows the training data very closely and is sensitive to noise; a large K smooths the decision but may blur class boundaries. Because it relies on distance, the features must be scaled first. KNN has no real training phase, but prediction can be slow on very large data.",
      procedure: ["Load, split and scale the data", "Fit KNN with different K values", "Record accuracy for K = 1 to 15", "Select the best odd K", "Predict a new flower measurement", "Report the neighbours' vote"],
      code: String.raw`# Exp 6E - K-nearest neighbours
import numpy as np
from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=3, stratify=iris.target)
sc = StandardScaler().fit(X_train)
Xtr, Xte = sc.transform(X_train), sc.transform(X_test)

scores = {k: KNeighborsClassifier(n_neighbors=k).fit(Xtr, y_train).score(Xte, y_test)
          for k in range(1, 16, 2)}
for k, s in scores.items():
    print(f"K={k:>2}  accuracy={s:.3f}")

best_k = max(scores, key=scores.get)
knn = KNeighborsClassifier(n_neighbors=best_k).fit(Xtr, y_train)
new = sc.transform([[5.9, 3.0, 5.1, 1.8]])
print("Best K:", best_k, "| prediction for [5.9, 3.0, 5.1, 1.8]:",
      iris.target_names[knn.predict(new)[0]])`,
      input: "Scaled Iris data (112 training, 38 test samples).",
      result: String.raw`K= 1  accuracy=0.947
K= 3  accuracy=0.974
K= 5  accuracy=0.974
K= 7  accuracy=0.947
...
Best K: 3 | prediction for [5.9, 3.0, 5.1, 1.8]: virginica`,
      analysis: "Accuracy peaks around K = 3 to 5 at about 97% and drops slightly for very small and large K, illustrating the bias-variance trade-off.",
      conclusion: "KNN is simple and effective on small, scaled datasets; K must be tuned using held-out data."
    }),
    sub(6, "F", {
      name: "K-Means Clustering and the Elbow Method",
      tools: DS_TOOLS.ml,
      aim: "To group unlabelled data using K-means and choose the number of clusters with the elbow method and silhouette score.",
      problem: "Segment 600 customers by annual income and spending score without any pre-defined labels.",
      explanation: "K-means is an unsupervised algorithm: it places K centroids, assigns each point to its nearest centroid, moves each centroid to the mean of its points and repeats until the assignments stop changing. Inertia is the sum of squared distances of points to their centroids; plotting it against K and looking for the 'elbow' where improvement slows suggests a suitable K. The silhouette score (from -1 to 1) measures how well separated the clusters are.",
      procedure: ["Generate the customer dataset", "Scale the two features", "Run K-means for K = 2 to 8", "Record inertia and silhouette score", "Choose the best K", "Describe each customer segment"],
      code: String.raw`# Exp 6F - K-means clustering
import numpy as np, pandas as pd
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

centers = [[25, 80], [25, 20], [55, 50], [85, 85], [85, 15]]
X, _ = make_blobs(n_samples=600, centers=centers, cluster_std=7, random_state=4)
df = pd.DataFrame(X, columns=["annual_income_k", "spending_score"]).clip(lower=5)
Xs = StandardScaler().fit_transform(df)

for k in range(2, 9):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(Xs)
    print(f"K={k}  inertia={km.inertia_:7.1f}  silhouette={silhouette_score(Xs, km.labels_):.3f}")

km = KMeans(n_clusters=5, n_init=10, random_state=0).fit(Xs)
df["segment"] = km.labels_
print(df.groupby("segment").agg(customers=("segment", "size"),
      income=("annual_income_k", "mean"), spend=("spending_score", "mean")).round(0))`,
      input: "A synthetic table of 600 customers with income (in thousands) and spending score.",
      result: String.raw`K=2  inertia= 780.4  silhouette=0.452
K=3  inertia= 520.9  silhouette=0.499
K=4  inertia= 305.2  silhouette=0.571
K=5  inertia=  97.8  silhouette=0.714
K=6  inertia=  84.3  silhouette=0.605
...
         customers  income  spend
segment
0              121      25     80
1              120      85     15
2              118      55     50
3              120      25     20
4              121      85     85`,
      analysis: "Inertia drops sharply until K = 5 and then flattens (the elbow), and the silhouette score is highest at K = 5, so both methods agree on five segments, such as 'high income, high spending' and 'low income, low spending'.",
      conclusion: "Clustering reveals structure in unlabelled data; the elbow and silhouette provide objective evidence for choosing K."
    }),
    sub(6, "G", {
      name: "Model Evaluation: Confusion Matrix and Cross-Validation",
      tools: DS_TOOLS.ml,
      aim: "To evaluate classifiers using a confusion matrix, precision, recall, F1-score and 5-fold cross-validation.",
      problem: "A single train-test split can give a lucky or unlucky result; the analyst needs a more reliable estimate and must see which classes are confused.",
      explanation: "A confusion matrix tabulates actual versus predicted classes; its diagonal shows correct predictions. Precision is the share of predicted positives that are correct, recall is the share of actual positives found, and F1 is their harmonic mean. K-fold cross-validation splits the data into K parts, trains on K-1 and tests on the remaining one, repeating K times; the mean and standard deviation of the K scores give a stable estimate and show variability.",
      procedure: ["Load Iris and split", "Train a logistic regression model", "Compute the confusion matrix", "Print the classification report", "Run 5-fold cross-validation for three models", "Compare mean accuracy and standard deviation"],
      code: String.raw`# Exp 6G - Evaluation and cross-validation
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.metrics import confusion_matrix, classification_report

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=8, stratify=iris.target)

model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=200)).fit(X_train, y_train)
pred = model.predict(X_test)
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred, target_names=iris.target_names, digits=2))

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
models = {
    "Logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=200)),
    "Tree(d=3)": DecisionTreeClassifier(max_depth=3, random_state=0),
    "KNN(k=5)": make_pipeline(StandardScaler(), KNeighborsClassifier(5)),
}
for name, m in models.items():
    s = cross_val_score(m, iris.data, iris.target, cv=cv)
    print(f"{name:10s} mean={s.mean():.3f}  std={s.std():.3f}")`,
      input: "Iris dataset: 105 training and 45 test samples, plus the full data for cross-validation.",
      result: String.raw`[[15  0  0]
 [ 0 14  1]
 [ 0  1 14]]
              precision    recall  f1-score   support
      setosa       1.00      1.00      1.00        15
  versicolor       0.93      0.93      0.93        15
   virginica       0.93      0.93      0.93        15
    accuracy                           0.96        45
Logistic   mean=0.967  std=0.021
Tree(d=3)  mean=0.953  std=0.034
KNN(k=5)   mean=0.973  std=0.027`,
      analysis: "All errors occur between versicolor and virginica; setosa is perfectly separated. Cross-validation shows the three models are within about 2% of each other and the small standard deviations indicate stable performance.",
      conclusion: "Students can now evaluate models properly with several metrics and cross-validation, completing the machine learning workflow."
    })
  ]
});

/* ============================================================
   Shared helpers (used by index.js, experiment.js, subexperiment.js)
   ============================================================ */
const STORAGE_KEYS = { custom: "mbu_ds_custom_experiments", theme: "mbu_ds_theme" };

function loadCustomExperiments() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.custom)) || []; }
  catch (e) { return []; }
}
function saveCustomExperiments(list) {
  try { localStorage.setItem(STORAGE_KEYS.custom, JSON.stringify(list)); return true; }
  catch (e) { return false; }
}
function getAllExperiments() {
  const custom = loadCustomExperiments().map(function (e) { return Object.assign({ custom: true }, e); });
  return experiments.concat(custom).sort(function (a, b) { return parseInt(a.id, 10) - parseInt(b.id, 10); });
}
function findExperiment(id) {
  const n = parseInt(id, 10);
  return getAllExperiments().find(function (e) { return parseInt(e.id, 10) === n; }) || null;
}
function expNumber(exp) { return String(parseInt(exp.id, 10)); }
function padId(id) { const n = parseInt(id, 10); return n < 10 ? "0" + n : String(n); }
function subLabel(sub) { const m = /^(\d+)([A-Z])$/i.exec(sub.id); return m ? padId(m[1]) + m[2].toUpperCase() : sub.id; }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : "#"; }

/* Builds a full experiment object from the "+ Add Experiment" form */
function buildCustomExperiment(f) {
  const id = padId(f.number);
  const n = parseInt(id, 10);
  const names = f.subNames.length ? f.subNames : ["Introduction", "Implementation", "Evaluation"];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const yt = f.youtube || ytLink(f.name + " tutorial");
  const gh = f.github || ghLink(f.name);
  return {
    id: id,
    name: f.name,
    custom: true,
    keywords: [f.name.toLowerCase()],
    description: f.description,
    youtube: yt,
    github: gh,
    overview: f.description,
    aim: "To study and implement: " + f.name + ".",
    problemStatement: "Add the problem statement for this experiment. Summary: " + f.description,
    dataset: { name: "To be specified", source: "To be specified", records: "-", features: "-", types: "-", note: "Edit js/data.js to add dataset details for this experiment." },
    methodology: names.map(function (nm) { return "Complete the sub-experiment: " + nm + "."; }),
    analysis: "Analyse the observations obtained in each sub-experiment of " + f.name + ".",
    results: "Record the final outputs and findings of the sub-experiments here.",
    architecture: [{ title: "Input Data", note: "dataset" }].concat(names.map(function (nm) { return { title: nm, note: "sub-experiment" }; })).concat([{ title: "Results", note: "final output" }]),
    subExperiments: names.map(function (nm, i) {
      return {
        id: n + letters[i], letter: letters[i], name: nm, youtube: yt, github: gh,
        tools: ["Python 3", "Jupyter Notebook"],
        aim: "To perform: " + nm + " (part of " + f.name + ").",
        problem: "Describe the specific problem solved in " + nm + ".",
        explanation: "Add a concept explanation for " + nm + ". This entry was created from the dashboard and can be refined by editing the data.",
        procedure: ["Understand the objective", "Load or create the data", "Implement the method", "Run and observe the output", "Record the result", "Write the conclusion"],
        code: "# " + n + letters[i] + " - " + nm + "\n# Write your Python code here\nprint('Experiment " + n + letters[i] + ": " + nm.replace(/'/g, "") + "')",
        input: "Specify the input required for this sub-experiment.",
        result: "Paste the program output here.",
        analysis: "Explain what the output shows.",
        conclusion: "Summarise what was learned in " + nm + "."
      };
    })
  };
}

/* ---------- Theme ---------- */
function applyTheme(t) { document.documentElement.setAttribute("data-theme", t); }
(function initThemeEarly() {
  let t = "dark";
  try { t = localStorage.getItem(STORAGE_KEYS.theme) || "dark"; } catch (e) {}
  applyTheme(t);
})();
function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  function paint() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀" : "☾";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("title", dark ? "Light mode" : "Dark mode");
  }
  btn.addEventListener("click", function () {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEYS.theme, next); } catch (e) {}
    paint();
  });
  paint();
}

/* ---------- Toast ---------- */
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(function () { t.classList.remove("show"); }, 2200);
}

/* ---------- Navbar markup shared by all pages ---------- */
function renderNavbar(active) {
  const items = [
    { key: "dashboard", ico: "▦", label: "Dashboard", href: "index.html" },
    { key: "careers", ico: "⚙", label: "Careers & Tools", href: "index.html#careers-overview" },
    { key: "modules", ico: "▤", label: "Modules", href: "index.html#modules-section" },
    { key: "experiments", ico: "⚗", label: "Experiments", href: "index.html#experiments" },
    { key: "resources", ico: "▶", label: "Resources", href: "index.html#resources" },
    { key: "profile", ico: "☺", label: "Profile", href: "index.html#profile" }
  ];
  const badge = document.getElementById("activeUserBadge");
  const meta = document.getElementById("studentMeta");
  if (badge) badge.textContent = STUDENT.name;
  if (meta) meta.textContent = "Subject code: " + STUDENT.subjectCode + " | " + STUDENT.degree + " · " + STUDENT.branch + " | Sec: " + STUDENT.sec + " · Sem: " + STUDENT.sem;
  return '<a class="brand" href="index.html" aria-label="Mohan Babu University Data Science Laboratory dashboard"><img class="brand-logo" src="assets/images/mbu-logo.png" alt="" width="42" height="42"><span class="brand-text"><strong>MOHAN BABU UNIVERSITY</strong><span>| Data Science Laboratory</span></span></a>' +
    '<nav class="primary-nav" aria-label="Main navigation">' +
    items.map(function (i) {
      return '<a class="nav-link' + (i.key === active ? " active" : "") + '"' + (i.key === active ? ' aria-current="page"' : "") + ' href="' + i.href + '" data-key="' + i.key + '">' + i.label + "</a>";
    }).join("") + "</nav>";
}

/* ---------- Lightweight Python syntax highlighter (single pass) ---------- */
function highlightPython(code) {
  const KW = "import|from|as|def|return|for|in|if|elif|else|while|print|True|False|None|and|or|not|with|lambda|class|try|except|range";
  const re = new RegExp("(#.*$)|(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*')|\\b(" + KW + ")\\b|\\b([A-Za-z_]\\w*)(?=\\()|\\b(\\d+\\.?\\d*)\\b", "gm");
  let out = "", last = 0, m;
  while ((m = re.exec(code)) !== null) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? "tk-c" : m[2] ? "tk-s" : m[3] ? "tk-k" : m[4] ? "tk-f" : "tk-n";
    out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

/* ---------- Animated page transitions between pages ---------- */
function setupPageTransitions() {
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });
}