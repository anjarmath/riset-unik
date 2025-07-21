import re


def validate_topic(topic_desc: str):
    topic_desc = topic_desc.strip()

    # Minimal 5 kata
    if len(topic_desc.split()) < 5:
        return False, "Topik harus terdiri dari minimal 5 kata."

    # Izinkan huruf, angka, dan simbol umum (&, ., , -)
    if not re.match(r'^[a-zA-Z0-9\s.,()\-&]+$', topic_desc):
        return False, "Topik mengandung karakter tidak valid. Gunakan huruf, angka, dan tanda baca umum."

    return True, topic_desc

def validate_topic_yapping(topic_desc: str):
    topic_desc = topic_desc.strip()

    # Minimal 15 kata
    if len(topic_desc.split()) < 15:
        return False, "Yappingmu harus minimal 15 kata. Kalau masukking pendek, mending pakai mode topik biasa."

    return True, topic_desc