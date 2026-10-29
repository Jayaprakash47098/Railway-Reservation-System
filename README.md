# Railway Reservation System using Queue (DSA Mini Project)

A simple railway ticket booking system that uses a **Queue (FIFO)** for the waiting list.

## Files
| File | Purpose |
|------|---------|
| `railway.c` | The C program (runs in the terminal) |
| `index.html` | Website page |
| `style.css` | Website design |
| `script.js` | Website logic (same idea as the C code) |

## Features
1. Book ticket (seat is given if free, otherwise the passenger joins the waiting queue)
2. Cancel ticket (the first passenger in the queue automatically gets the seat)
3. Show available seats
4. Display the waiting queue

## Data Structure Used
- **Array** for the 5 seats
- **Queue (FIFO)** for the waiting list: `enqueue` adds at the rear, `dequeue` removes from the front

## How to Run the C Program
```
gcc railway.c -o railway
./railway        (on Windows: railway.exe)
```

## How to Run the Website
Double-click `index.html`. No installation needed.

## Live Website
After publishing with GitHub Pages: `https://YOUR-USERNAME.github.io/railway-reservation/`

## Publish on GitHub Pages
1. Create a new **public** repository named `railway-reservation`.
2. Click **uploading an existing file** and upload all files (not the folder).
3. Click **Commit changes**.
4. Go to **Settings > Pages**. Under Source choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
5. Wait 1-2 minutes and open the link shown on that page.

## Note
Browsers cannot run C code directly, so the website uses JavaScript with the same queue logic as `railway.c`.

## Made by
Your Name, Class, College
