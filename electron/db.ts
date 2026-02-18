import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

const isDev = process.env.NODE_ENV === 'development'; // Need to set this in script or detect otherwise

// In dev, use local file. In prod, use userData.
// But for persistence in dev across restarts, userData is better generally, 
// or valid local path. 
const dbPath = path.join(app.getPath('userData'), 'school.db');

console.log('Database path:', dbPath);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initDb() {
    const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT,
      role TEXT CHECK(role IN ('admin', 'teacher')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      dob TEXT,
      enrollment_number TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      teacher_id INTEGER,
      FOREIGN KEY(teacher_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      student_id INTEGER,
      class_id INTEGER,
      PRIMARY KEY (student_id, class_id),
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(class_id) REFERENCES classes(id)
    );

    CREATE TABLE IF NOT EXISTS fees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      amount REAL,
      due_date TEXT,
      status TEXT CHECK(status IN ('paid', 'pending')),
      FOREIGN KEY(student_id) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER,
      subject TEXT,
      date TEXT,
      FOREIGN KEY(class_id) REFERENCES classes(id)
    );

    CREATE TABLE IF NOT EXISTS exam_results (
      exam_id INTEGER,
      student_id INTEGER,
      marks_obtained REAL,
      max_marks REAL,
      FOREIGN KEY(exam_id) REFERENCES exams(id),
      FOREIGN KEY(student_id) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS salaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      amount REAL,
      payment_date TEXT,
      month TEXT,
      FOREIGN KEY(teacher_id) REFERENCES users(id)
    );
  `;

    db.exec(schema);

    // Seed default admin
    const stmt = db.prepare('SELECT count(*) as count FROM users');
    const result = stmt.get() as { count: number };
    if (result.count === 0) {
        const insert = db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)');
        // TODO: Use real hashing in production. Using plain text 'admin123' for prototype as requested "login page".
        // Will stick to simple string for now, but in real app use bcrypt.
        insert.run('admin', 'admin123', 'admin');
        console.log('Default admin created: admin/admin123');
    }
}

export default db;
