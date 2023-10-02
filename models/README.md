| Field          | Type                          | Required | Default                  | Validation/Comments                                 |
|----------------|-------------------------------|----------|--------------------------|----------------------------------------------------|
| username       | Object                        | -        | -                        | -                                                  |
| - f_name       | String                        | Yes      | -                        | -                                                  |
| - l_name       | String                        | Yes      | -                        | -                                                  |
| email          | String                        | Yes      | -                        | Must match the email pattern (regex validation)   |
| password       | String                        | Yes      | -                        | -                                                  |
| mobile         | Number                        | Yes      | -                        | -                                                  |
| otp            | Number                        | No       | -                        | -                                                  |
| address        | Array of Objects              | -        | -                        | -                                                  |
| - add_name     | String                        | No       | "home"                   | Max length: 10 characters                           |
| - street       | String                        | No       | ""                       | -                                                  |
| - landmark     | String                        | No       | ""                       | -                                                  |
| - city         | String                        | No       | "Himmatnagar"            | -                                                  |
| - zipcode      | Number                        | No       | 383001                   | -                                                  |
| - state        | String                        | No       | "Gujarat , In"           | -                                                  |
| cart           | Array of Objects (References)  | -        | -                        | -                                                  |
| - cart_id      | ObjectId (Reference)          | Yes      | -                        | Must reference a valid ObjectId for items          |
| - quantity     | Number                        | Yes      | -                        | -                                                  |
