

1. Install Python 
2. Set the env  for python
3. Download the repo
4. Install flask using pip - "pip install flask" 
5. Run app.py file using - "python app.py"
6. Use the below curl to run the API
```
curl --location 'http://127.0.0.1:5000/clean' \
--header 'Content-Dispositio: attachment' \
--form 'file=@"/C:/Users/Anirudh/Documents/input.ts"'


```



Assumptions -

1. Hoping the key word function is correctly added in input file 
2. File only contains functions 
