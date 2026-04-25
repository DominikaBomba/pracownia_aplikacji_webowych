from collections import defaultdict
from typing import List, Dict


def read_graph(filename: str) -> Dict:

    adj_dict = defaultdict(list)
    num_v = 0


    with open(filename, 'r') as file:
        lines = file.readlines()
        if lines:
            num_v = int(lines[0].strip())
            for line in lines[1:]:
                parts = list(map(int, line.split()))
                if parts:
                    v = parts[0]
                    neighbors = parts[1:]

                    adj_dict[v].extend(neighbors)

    return {"data": adj_dict, "count": num_v}


def write_neighbours_list(adj_dict: Dict[int, List[int]]) -> None:

    for v in sorted(adj_dict.keys()):
        neighbors_str = ", ".join(map(str, adj_dict[v]))
        print(f"Sąsisadami wierzchołka {v}są: {neighbors_str}")


def list_to_matrix(adj_dict: Dict[int, List[int]], num_vertices: int) -> List[List[int]]:

    matrix = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]

    for v, neighbors in adj_dict.items():
        for n in neighbors:
            if v < num_vertices and n < num_vertices:
                matrix[v][n] = 1
    return matrix


def write_matrix(matrix: List[List[int]]) -> None:

    for row in matrix:
        print(" ".join(map(str, row)))


def main() -> None:

    graph_info = read_graph("graphs.txt")

    adj_data = graph_info["data"]
    num_v = graph_info["count"]


    write_neighbours_list(adj_data)
    matrix = list_to_matrix(adj_data, num_v)
    write_matrix(matrix)


if __name__ == "__main__":
    main()