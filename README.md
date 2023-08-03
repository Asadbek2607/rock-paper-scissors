# rock-paper-scissors
for Itransition

Secure Rock-Paper-Scissors Game with HMAC Verification

The Rock-Paper-Scissors game is a classic and simple hand-gesture game enjoyed by many. To ensure fairness and integrity in the game, it has implemented a secure version that employs HMAC (Hash-based Message Authentication Code) verification.

Cryptographically Strong Random Key Generation:

Before the game starts, a cryptographically strong random key of at least 256 bits (32 bytes) is generated using a secure random number generator. This key serves as a secret and secure element of the game.

Preventing Move Alteration:

Upon the game's initiation, the computer generates its move and calculates the corresponding HMAC value. This HMAC value is displayed to the player before they make their move. By doing so, the player can verify that the computer's move remains unchanged throughout the game, as any alteration in the move would result in a different HMAC value.

User Verification and Fairness:

After the player makes their move, they are presented with the HMAC calculated earlier (corresponding to the computer's move) and the original key used for HMAC calculations. The player can independently calculate the HMAC of their move using the same key and their chosen move. By comparing their calculated HMAC with the one shown earlier, the player can ensure that the computer did not modify its move after seeing the player's move, thus ensuring a fair game.

