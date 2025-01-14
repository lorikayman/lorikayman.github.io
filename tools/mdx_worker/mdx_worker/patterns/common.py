from pathlib import Path

class FilePattern:
    """Base class for crude file generation based of it's slotted parameters

    Parameters
    ----------
    path : Path
        Patth to a future file relative to project root
    layout_start : str
        Unchanging file contents string up to a slotted string
    layout_end : str
        Unchanging file contents string after a slotted string
    slot_pattern : str
        Slotted string to be generated basedof class parameters input

    Methods
    -------
    compile : str
        Outputs finalised file contents
    """

    def __init__(self,
        path: Path,
        layout_start: str,
        layout_end: str,
        slot_pattern: str,
    ) -> None:
        self.path = path
        self.layout_start = layout_start
        self.layout_end = layout_end
        self.slot_pattern = slot_pattern

    def write(self, data) -> None:
        with open(self.path, mode='w', encoding='utf-8') as fh:
            fh.write(data)

    def compile(self, slot_list: list[str]) -> str:
        """
        Parameters
        ----------
        slot_list : list[str]

        Returns
        -------
        data : str
            Compiled string
        """
        data = ''.join(
            self.layout_start,
            [self.slot_pattern % slot for slot in slot_list],
            self.layout_end,
        )
        return data
