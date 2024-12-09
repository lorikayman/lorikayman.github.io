from re import (
    compile as re_compile,
    Pattern,
    VERBOSE,
)

class WIKILINK:
    """Wikilink processing logic

    Attributes
    ----------
    PATTERN : Pattern
        Searched wikilink string pattern
    LINK_COMPONENT_TEMPLATE : str
        Svelte component slotted string w/ 2 slots:
        - URL last part
        - Visible text (as in `<a>...<a/>`)
    """

    PATTERN: Pattern = re_compile(
        r"""\[{2}   # ope nning doubles
            (?P<filename>[\w\s]+?) # filename
            (?:\#(?P<id>[\w\s\-//\'\.\d\(\)\[\]]+))?    # wont capture, we ignore ids
            (?:[\|\:](?P<alias>[\w\s\-//\'\.\d\(\)]+))?    # visible alias
            \]{2}""", VERBOSE,
    )
    LINK_COMPONENT_TEMPLATE = '<Link path="/mawanet/{}">{}</Link>'
