import json
from math import sin, cos, sqrt, atan2, radians 

# approximate radius of earth in km

def distance(chords1:dict, chords2:dict):
    R = 6373.0
    lat1 = radians(float(chords1['lat']))
    lon1 = radians(float(chords1['lng']))
    lat2 = radians(float(chords2['lat']))
    lon2 = radians(float(chords2['lng'])) 

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c