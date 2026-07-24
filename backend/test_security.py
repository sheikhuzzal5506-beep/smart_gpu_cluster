from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token,
)

password = "123456"

hashed = hash_password(password)

print("Original Password :", password)
print("Hashed Password   :", hashed)

print("Password Match    :", verify_password(password, hashed))

token = create_access_token(
    {
        "sub": "admin@gmail.com"
    }
)

print("\nJWT Token:\n")
print(token)

print("\nDecoded Token:\n")
print(verify_token(token))