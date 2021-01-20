import urllib.request
import json
from tsp import *
import math
import numpy as np

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
        if len(wordSplit)-1 > i:
            word = word + wordSplit[i] + "+"
        else:
            word = word + wordSplit[i]
    vector.append(word)

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
            
print(vector)
distanceMatrix = np.array(graph, dtype=float)
print(TSP_dynamic(listLength,distanceMatrix))

# file = open('arr.txt','w')
# for i in range(len(vector)):
#     for j in range(len(vector)):
#         file.write(str(graph[i][j]) + " ")
#     file.write("\n")









