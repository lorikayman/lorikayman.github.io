from re import (
    compile as re_compile,
    Pattern,
    VERBOSE,
)

class MDLINK:
    """Link processing logic

    Attributes
    ----------
    PATTERN : Pattern
        Searched link string pattern
    LINK_COMPONENT_TEMPLATE : str
        Svelte component slotted string w/ 2 slots:
        - URL last part
        - Visible text (as in `<a>...<a/>`)
    """

    PATTERN: Pattern = re_compile(
        r"""\[
            (?P<text>[\w\s\-\/\'\.\d\(\)]+) # plaintext to read
            \]
            \(
            (?P<url>https?[\.\-\w\s\'\.\d\%\:\_\/\']+?) # url itself, with http
            (?P<id>\#[\w\s\-\/\'\.\d\%]+)?    # id within a page
            \)""", VERBOSE,
    )
    COMPONENT_TEMPLATE = '<a href="{}" target="_blank">{}</a>'

