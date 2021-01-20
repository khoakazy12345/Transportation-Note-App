import math
import numpy as np


# Given the current set having k cardinality,return the
# next set also having k cardinality (Gosper's hack)
def nextSet(sett):
    onlyChild = sett & (-sett)
    moveAhead = sett + onlyChild
    if moveAhead == 0:
        return 0
    oneMoreSoldier = moveAhead ^ sett
    backToOrigin = (oneMoreSoldier // onlyChild) >> 2
    return moveAhead + backToOrigin


# Knowing (location)th bit is always on,
# get rid of that bit from sett
def compression(sett, location):
    return (sett & ((1 << location) - 1)) | ((sett & ~((2 << location) - 1)) >> 1)


# Given  a distance matrix, implement the dynamic algorithm
# to solve TSP problem for 0 to n-1 locations
# starting from n-1 to other locations and back to n-1
def TSP_dynamic(n, matrix):
    # Basic info:
    # matrix[i,j]: distance from i to j

    # Calculate the maximum shortest path
    maxPath = np.inf
    # Initialize
    S = 1 << n - 1
    ot = np.full((1 << n - 2, n - 1), -1, dtype=float)  # Compression here
    # ot(S, i) = matrix[n-1 to i] when S has cardinality = 1
    for location in range(n - 1):
        ot[compression(1 << location, location), location] = matrix[n - 1, location]  # Compression here

    # Dynamic programming
    for card in range(2, n):  # cardinality from 2 to n-1
        sett = (1 << card) - 1  # the first set with according cardinality
        while sett != 0 and sett < S:  # S is the stop for nextSet()
            for location in range(n - 1):
                if sett & (1 << location) == 0:  # if location is not in the set
                    continue
                # else compute the min
                subset = sett & ~(1 << location)  # the subset of {set \ location}
                # initialize to maximum shortest path
                ot[compression(sett, location), location] = maxPath  # Compression here
                for fromLocation in range(n - 1):
                    # for each fromLocation different from location and in the set
                    if fromLocation != location and sett & (1 << fromLocation) > 0:
                        ot[compression(sett, location), location] = min(ot[compression(sett, location), location],
                                                                        ot[compression(subset,
                                                                                       fromLocation), fromLocation] +
                                                                        matrix[fromLocation, location])
            sett = nextSet(sett)  # get the next set with the according cardinality

    # Find the best distance
    bestDistance = maxPath
    currentJourney = (1 << (n - 1)) - 1
    for location in range(n - 1):
        bestDistance = min(bestDistance, ot[compression(currentJourney, location), location] + matrix[location, n - 1])
    print(bestDistance)

    # Returning the best route
    route = np.empty((n,), dtype=int)
    route[0] = n - 1  # The last location is n-1
    for location in range(1, n):  # for the next ordered location
        for nextLocation in range(n - 1):  # for each location that comes from that previous location
            if currentJourney & (1 << nextLocation) > 0:  # if the nextLocation is in the journey
                if bestDistance == ot[compression(currentJourney, nextLocation), nextLocation] \
                        + matrix[nextLocation, route[location - 1]]:
                    route[location] = nextLocation
                    bestDistance -= matrix[nextLocation, route[location - 1]]
                    currentJourney &= ~(1 << nextLocation)
                    break
    
    return route

# def main():
    # # initialize number of locations (n) and the distance matrix
    # n = 17
    # matrix = []
    # np.set_printoptions(threshold=np.inf)

    # # create distance matrix
    # f = open("scratch.txt", 'r')
    # for line in f:
    #     matrix.append([float(i) for i in line.split()])
    # f.close()
    # distanceMatrix = np.array(matrix, dtype=float)
    # # print(distanceMatrix)
    # # distanceMatrix[distanceMatrix == 1000] = np.inf

    # # TSP
    # TSP_dynamic(n, distanceMatrix)

# main()