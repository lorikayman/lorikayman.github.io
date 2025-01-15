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
            (?P<text>[\w\s\-\/\'\.\d\(\)]+)
            \]
            \(
            (?P<url>https?[\.\-\w\s\:\_\/]+?)
            (?:\#(?P<id>[\w\s\-\/\'\.\d\(\)\[\]]+))?    # id
            \)""", VERBOSE,
    )
    COMPONENT_TEMPLATE_NEWTAB = '<a href="{}" target="_blank">{}</a>'
    COMPONENT_TEMPLATE = '<a href="{}">{}</a>'

