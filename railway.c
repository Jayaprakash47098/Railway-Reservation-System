/* Railway Reservation System using Queue (FIFO) - College Mini Project */
#include <stdio.h>

#define TOTAL_SEATS 5
#define MAX_WAIT 5

struct Passenger {
    int id;
    char name[30];
};

struct Passenger seats[TOTAL_SEATS];  /* id = 0 means the seat is empty */
struct Passenger queue[MAX_WAIT];     /* waiting list (queue) */
int waitCount = 0;                    /* number of people waiting */
int nextId = 1;                       /* next ticket ID */

/* Add a passenger at the END of the queue */
void enqueue(struct Passenger p) {
    queue[waitCount] = p;
    waitCount++;
}

/* Remove the passenger at the FRONT of the queue (FIFO) */
struct Passenger dequeue() {
    struct Passenger first = queue[0];
    int i;
    for (i = 0; i < waitCount - 1; i++) {
        queue[i] = queue[i + 1];
    }
    waitCount--;
    return first;
}

void bookTicket() {
    struct Passenger p;
    int i;
    printf("Enter passenger name (one word): ");
    scanf("%29s", p.name);
    p.id = nextId;

    for (i = 0; i < TOTAL_SEATS; i++) {
        if (seats[i].id == 0) {
            seats[i] = p;
            printf("Ticket CONFIRMED! Ticket ID: %d, Seat No: %d\n", p.id, i + 1);
            nextId++;
            return;
        }
    }

    if (waitCount < MAX_WAIT) {
        enqueue(p);
        printf("Train is full. %s added to waiting list (position %d). Ticket ID: %d\n", p.name, waitCount, p.id);
        nextId++;
    } else {
        printf("Sorry, train and waiting list are both full.\n");
    }
}

void cancelTicket() {
    int id, i, j;
    printf("Enter ticket ID to cancel: ");
    scanf("%d", &id);

    if (id <= 0) {
        printf("Invalid ticket ID.\n");
        return;
    }

    /* Case 1: ticket is a confirmed seat */
    for (i = 0; i < TOTAL_SEATS; i++) {
        if (seats[i].id == id) {
            printf("Ticket %d cancelled. Seat %d is free.\n", id, i + 1);
            seats[i].id = 0;
            if (waitCount > 0) {
                seats[i] = dequeue();   /* first person in queue gets the seat */
                printf("%s (ID %d) from the waiting list got Seat %d.\n", seats[i].name, seats[i].id, i + 1);
            }
            return;
        }
    }

    /* Case 2: ticket is in the waiting list */
    for (i = 0; i < waitCount; i++) {
        if (queue[i].id == id) {
            for (j = i; j < waitCount - 1; j++) {
                queue[j] = queue[j + 1];
            }
            waitCount--;
            printf("Waiting ticket %d cancelled.\n", id);
            return;
        }
    }

    printf("Ticket ID not found.\n");
}

void showSeats() {
    int i, freeSeats = 0;
    printf("\n--- Seat Status ---\n");
    for (i = 0; i < TOTAL_SEATS; i++) {
        if (seats[i].id == 0) {
            printf("Seat %d : Available\n", i + 1);
            freeSeats++;
        } else {
            printf("Seat %d : Booked by %s (ID %d)\n", i + 1, seats[i].name, seats[i].id);
        }
    }
    printf("Available seats: %d\n", freeSeats);
}

void showQueue() {
    int i;
    printf("\n--- Waiting Queue (front to rear) ---\n");
    if (waitCount == 0) {
        printf("Waiting list is empty.\n");
        return;
    }
    for (i = 0; i < waitCount; i++) {
        printf("%d. %s (ID %d)\n", i + 1, queue[i].name, queue[i].id);
    }
}

int main() {
    int choice;
    do {
        printf("\n===== RAILWAY RESERVATION SYSTEM =====\n");
        printf("1. Book Ticket\n");
        printf("2. Cancel Ticket\n");
        printf("3. Show Available Seats\n");
        printf("4. Show Waiting Queue\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: bookTicket(); break;
            case 2: cancelTicket(); break;
            case 3: showSeats(); break;
            case 4: showQueue(); break;
            case 5: printf("Thank you!\n"); break;
            default: printf("Invalid choice. Try again.\n");
        }
    } while (choice != 5);
    return 0;
}
