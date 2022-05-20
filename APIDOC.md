# Favorite Pokemon API Documentation
The favorite pokemon API provides a list of my favorite pokemon

## Get a list of my favorite pokemon
**Request Format:** /favorite

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** returns a list of my favorite pokemon by their pokedex numbers


**Example Request:** /favorite

**Example Response:**
149
350
448
330
257
384

**Error Handling:**
No error handling in this request

## Get a specific pokemon
**Request Format:** /specific?number=pokemonNumber

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** returns a specific pokemon number

**Example Request:** /specific?number=150

**Example Response:**
*Fill in example response in the {}*

```json
{
  "number": 150

}
```

**Error Handling:**
Possible 400 level error if the specified pokedex number doesn't exist (not between 1 and 493 inclusive)
Possible 400 level error if no pokedex number is specified
