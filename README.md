DO THIS BEFORE USING THIS WEBSITE
Login
user: test@gmail.com, pw: 12345
Necessary to have the expected User Experience
Use Google Chrome as browser - otherwise some features or pages will throw errors or won't show
Install the server.cert certificate for the HTTPS crypted stream - otherwise it's not possible to reach the singleview
Register on the website - after that you're automatically logged in - your data should be persistent on the mongoDB and can be reused
Only logged in users can create and like memes as well as watch their personal profile
To delete a element in the meme editor use control as mac user or backspace + ctrl as windows user
Meme Creation API
The API for creating memes is located under GET:http://localhost:3002/api/meme

You can use the API to create one or multiple memes using a specified template.

Templates are pulled from the Top100 memes of imgflip.com and can be referenced by their name in this API: https://api.imgflip.com/get_memes

Supply the following URL-paramters to configure n-many memes:

template: String: The meme template name according to https://api.imgflip.com/get_memes
memes[0...(n-1)]: [CaptionConfig]: The memes you want to create
CaptionConfig: {"text": String, "x": Int, "y": Int, "size": Int} : Configuration for each meme caption
Possible font sizes: 8, 10, 12, 14, 16, 32, 64, 128
Example:
http://localhost:3002/api/meme?template=Drake Hotline Bling&memes[0]=[{"text":"Read The Documentation","x":650,"y":300,"size":32},{"text":"Just Ask ChatGPT","x":650,"y":850, "size":64}]&memes[1]=[{"text":"Different Memes","x":650,"y":300,"size":32},{"text":"The Same Meme Again","x":650,"y":850, "size":32}]

Meme Retrieval API
The API for retrieving memes is located under GET:http://localhost:3002/api/search

You can use the API to search and download existing memes in the database.

Just calling the API without parameters returns the ten latest public memes in descending order.

The following optional URL-parameters can be used to refine the search:

title: String: A string the title of the meme must contain
order: String: The order of the memes sorted by the time of creation. Can either be ascending or descending. Default is descending
creator: String: The mail-address of the creator of the meme
limit: Int: The maximum number of memes that should be returned
Example:
http://localhost:3002/api/search?title=ChatGPT&order=ascending&creator=test@gmail.com&limit=2