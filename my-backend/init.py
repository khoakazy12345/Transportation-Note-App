import urllib.request
import json

inf = 0

file = open('c:\\Users\\Jose Salinas\\Desktop\\Projects\\Hack_Ohio\\Hack_Ohio_2021\\my-backend\\key.txt','r')
key = file.read().strip()

vector = []
firstTime = False

addrRead = open('c:\\Users\\Jose Salinas\\Desktop\\Projects\\Hack_Ohio\\Hack_Ohio_2021\\my-backend\\addr.txt','r')

vectorList = addrRead.read().splitlines()

for j in range(len(vectorList)):
    line = vectorList[j]
    wordSplit = line.split(" ")
    word = ""
    for i in range(len(wordSplit)):
        if (len(wordSplit)-1 > i):
            word = word + wordSplit[i] + "+"
        else:
            word = word + wordSplit[i]
    vector.append(word)



# print('Please enter origin address first, then other destination addresses wanted: Please only use spaces')
# print('to stop please type "end"')

# word = input()
# while word != 'end': 
#     if word == '':
#         continue
    # wordSplit = word.split(" ")
    # word = ""
    # for i in range(len(wordSplit)):
    #     if (len(wordSplit)-1 > i):
    #         word = word + wordSplit[i] + "+"
    #     else:
    #         word = word + wordSplit[i]
    # vector.append(word)
#     word = input()
listLength = len(vector)

graph = [[0 for i in range(listLength)] for j in range(listLength)]
for i in range(len(vector)):
    for j in  range(len(vector)):
        if i == j:
            # graph[i].insert(j,inf)
            graph[i][j] = inf
        else:
            origin = vector[i]
            destination = vector[j]
            url = ('https://maps.googleapis.com/maps/api/distancematrix/json' 
                    +'?language=en-US&units=imperial'
                    +'&origins={}'
                    +'&destinations={}'
                    + '&key={}').format(origin,destination,key)
            response = urllib.request.urlopen(url)
            response = json.loads(response.read())
            graph[i][j] = response['rows'][0]['elements'][0]['duration']['value']
            # graph[i][j] = 8

file = open('arr.txt','w')
for i in range(len(vector)):
    for j in range(len(vector)):
        file.write(str(graph[i][j]) + " ")
    file.write("\n")    



# visited = [[False]*listLength]*listLength
# disGraph = [inf]*listLength
# disGraph[src] = 0 
# for i in range(listLength):
#     nearest = getNearest()
#     visited[nearest] = True
#     for adj in range(listLength):
#         if cost[nearest][adj] == inf:
#             print("bruh")
# def getNearest():
#     minval = inf
#     minNode = 0
#     for i in range(listLength):
#         if not visited[i] and graph[i] < minval:
#             minval = graph[i]
#             minnode = i
        
#     return minnode







