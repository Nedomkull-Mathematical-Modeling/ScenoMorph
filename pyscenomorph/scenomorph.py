import itertools


def _check_consistency(group, matrix):
    for i, col_nbr in enumerate(group):
        for row_nbr in group[i + 1 :]:
            if not matrix[row_nbr][col_nbr]:
                return False
    return True


def find_solutions(fields, matrix):
    parameter_field_lengths = [len(f) for f in fields]
    ranges = [
        list(
            range(
                sum(parameter_field_lengths[:pfl_idx]),
                sum(parameter_field_lengths[: pfl_idx + 1]),
            )
        )
        for pfl_idx in range(len(parameter_field_lengths))
    ]

    solutions = []
    for group in itertools.product(*ranges):
        if _check_consistency(group, matrix):
            solutions.append(group)
    return solutions
