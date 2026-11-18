# Testing Exam Attempts Feature

## How to Test

### Option 1: Complete a Real Exam (Recommended)
1. Go to http://localhost:3000/practice-exam
2. Click any exam to start
3. Choose "Real exam" mode (or Practice mode)
4. Answer all questions (or skip some)
5. Click "Submit exam" or "Finish" when done
6. Review your results on the results page
7. Click "Back to exams" button
8. Go to http://localhost:3000/attempts
9. Your exam attempt should appear in the list

### Option 2: Test via Browser Console
If you want to manually add test data:

1. Open the browser (F12 to open DevTools)
2. Go to the Console tab
3. Paste this code:
```javascript
const testAttempt = {
  id: "test-exam-" + Date.now(),
  code: "CS0-004",
  title: "CompTIA Cybersecurity Analyst CS0-004 Practice Exam",
  mode: "practice",
  score: 75,
  total: 100,
  date: new Date().toISOString().split('T')[0],
  correct: 45,
  incorrect: 20,
  unanswered: 8
};
const attempts = JSON.parse(localStorage.getItem("exam-attempts:v1") || "[]");
attempts.push(testAttempt);
localStorage.setItem("exam-attempts:v1", JSON.stringify(attempts));
console.log("✅ Test attempt added! Refresh the page to see it.");
```

4. Press Enter
5. Refresh the attempts page
6. You should see your test attempt

## Debugging

### Check if data is saved:
In browser console:
```javascript
localStorage.getItem("exam-attempts:v1")
```

### Clear all attempts:
In browser console:
```javascript
localStorage.removeItem("exam-attempts:v1")
```

### View browser console for logs:
- Open DevTools (F12)
- Go to Console tab
- Look for messages with ✅ (success) or ❌ (error)

## Expected Behavior

✅ After clicking "Back to exams" on the results page:
1. A console message appears: "✅ Exam attempt saved: ..."
2. Data is stored in localStorage
3. Attempts page shows the new attempt in a card with:
   - Exam title and code
   - Practice/Real exam badge
   - Date taken
   - Score percentage (with color coding)
   - Breakdown of correct/incorrect/unanswered

❌ If nothing shows:
1. Check browser console (F12) for errors
2. Verify you clicked "Back to exams" and not "Retake exam"
3. Make sure you finished/submitted the exam
4. Try refreshing the page
5. Check localStorage: `localStorage.getItem("exam-attempts:v1")`
