import urllib.request
import json

inf = 9999999999999999999

file = open('key.txt','r')
key = file.read().strip()

vector = []
firstTime = False

print('Please enter origin address first, then other destination addresses wanted: Please only use spaces')
print('to stop please type "end"')

word = input()
while word != 'end': 
    if word == '':
        continue
    wordSplit = word.split(" ")
    word = ""
    for i in range(len(wordSplit)):
        if (len(wordSplit)-1 > i):
            word = word + wordSplit[i] + "+"
        else:
            word = word + wordSplit[i]
    vector.append(word)
    word = input()
listLength = len(vector)
graph =[[0]*listLength]*listLength

for i in range(len(vector)):
    for j in range(len(vector)):
        if vector[i] == vector[j]:
            graph[i][j] = inf
            continue
        origin = vector[i]
        destination = vector[j]
        url = ('https://maps.googleapis.com/maps/api/distancematrix/json' 
                +'?language=en-US&units=imperial'
                +'&origins={}'
                +'&destinations={}'
                + '&key={}').format(origin,destination,key)
        response = urllib.request.urlopen(url)
        response = json.loads(response.read())
        print(response)
        graph[i][j] = response['rows'][0]['elements'][0]['duration']['value']

file = open('arr.txt','w')
for i in range(len(vector)):
    for j in range(len(vector)):
        file.write(graph[i][j] + ",")


visited = [[False]*listLength]*listLength
disGraph = [inf]*listLength
disGraph[src] = 0 

def getNearest():
    minval = inf
    minNode = 0
    for i in range(listLength):
        if not visited[i] and graph[i] < minval:
            minval = graph[i]
            minnode = i
        
    return minnode

for i in range(listLength):
    nearest = getNearest()
    visited[nearest] = True

    for adj in range(listLength):
        if cost[nearest][adj] == inf 





