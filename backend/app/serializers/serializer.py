from typing import List


def serializeDict(document) -> dict:
    return {
        **{i: str(document[i]) for i in document if i == "_id"},
        **{i: document[i] for i in document if i != "_id"},
    }


def serializeDictList(docList) -> List:
    return [serializeDict(document) for document in docList]
