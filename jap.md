API DETAILS
API URL

https://justanotherpanel.com/api/v2
API KEY (CAN BE FOUND IN YOUR ACCOUNT PAGE)

Your API Key
HTTP METHOD

POST
RESPONSE FORMAT

JSON
EXAMPLE CODE

https://justanotherpanel.com/example.txt
SERVICE LIST
KEY

Your API key
ACTION

services
[
    {
        "service": 1,
        "name": "Followers",
        "type": "Default",
        "category": "First Category",
        "rate": "0.90",
        "min": "50",
        "max": "10000",
        "refill": true,
        "cancel": true
    },
    {
        "service": 2,
        "name": "Comments",
        "type": "Custom Comments",
        "category": "Second Category",
        "rate": "8",
        "min": "10",
        "max": "1500",
        "refill": false,
        "cancel": true
    }
]
ADD ORDER

KEY

Your API key
ACTION

add
SERVICE

Service ID
LINK

Link to page
QUANTITY

Needed quantity
RUNS (OPTIONAL)

Runs to deliver
INTERVAL (OPTIONAL)

Interval in minutes
{
    "order": 23501
}
ORDER STATUS
KEY

Your API key
ACTION

status
ORDER

Order ID
{
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
}
MULTIPLE ORDERS STATUS
KEY

Your API key
ACTION

status
ORDERS

Order IDs (separated by a comma, up to 100 IDs)
{
    "1": {
        "charge": "0.27819",
        "start_count": "3572",
        "status": "Partial",
        "remains": "157",
        "currency": "USD"
    },
    "10": {
        "error": "Incorrect order ID"
    },
    "100": {
        "charge": "1.44219",
        "start_count": "234",
        "status": "In progress",
        "remains": "10",
        "currency": "USD"
    }
}
CREATE REFILL
KEY

Your API key
ACTION

refill
ORDER

Order ID
{
    "refill": "1"
}
CREATE MULTIPLE REFILL
KEY

Your API key
ACTION

refill
ORDERS

Order IDs (separated by a comma, up to 100 IDs)
[
    {
        "order": 1,
        "refill": 1
    },
    {
        "order": 2,
        "refill": 2
    },
    {
        "order": 3,
        "refill": {
            "error": "Incorrect order ID"
        }
    }
]
GET REFILL STATUS
KEY

Your API key
ACTION

refill_status
REFILL

Refill ID
{
    "status": "Completed"
}
GET MULTIPLE REFILL STATUS
KEY

Your API key
ACTION

refill_status
REFILLS

Refill IDs (separated by a comma, up to 100 IDs)
[
    {
        "refill": 1,
        "status": "Completed"
    },
    {
        "refill": 2,
        "status": "Rejected"
    },
    {
        "refill": 3,
        "status": {
            "error": "Refill not found"
        }
    }
]
CREATE CANCEL
KEY

Your API key
ACTION

cancel
ORDERS

Order IDs (separated by a comma, up to 100 IDs)
[
    {
        "order": 9,
        "cancel": {
            "error": "Incorrect order ID"
        }
    },
    {
        "order": 2,
        "cancel": 1
    }
]
USER BALANCE
KEY

Your API key
ACTION

balance
{
    "balance": "100.84292",
    "currency": "USD"
}