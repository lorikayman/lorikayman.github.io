from typing import Generator

from pathlib import Path
from typing import Any
from json import loads
from os import mkdir
from shutil import rmtree

from re import (
    compile as re_compile,
    DOTALL,
)

from .patterns import (
    MDX_COMPONENT_LOADER, ENTRY_PAGEJS, WIKILINK,
)


class SourceModifier:
    """Callable class to process given markdwn filetree

    Parameters
    ----------
    glob_root : Path
        Path to `.md`s' root directory
    output_dir : Path
        Where files will be moved
    whitelist : Path
        Path to `.json` whitelist of allowed to be processed `.md` entries
    """

    _MDX_IMPORTS = '<script>import Link from "$lib/components/link.svelte";\nimport SecureEnclaveA from "$lib/components/niem_enclaves/a.svelte"\n</script>\n' 
    _RE_COMMENT = re_compile(r"(?P<comm_start><!--).+?(?P<comm_end>-->)", DOTALL)

    def __init__(self,
        glob_root: Path,
        output_dir: Path,
        whitelist: None | Path,
    ) -> None:
        self._glob_root = glob_root
        self._output_dir = output_dir
        self._whitelist = whitelist

    def __parse_whitelist(self) -> list[str]:
        """Parse given `_whitelist` if it was given

        Returns
        -------
        list[str]
            List of filename strings
        """
        text = loads(self._whitelist.read_text())
        whileisted_file_stems = []
        for filename in text['allow']:
            whileisted_file_stems.append(filename)
        return whileisted_file_stems

    def __call__(self) -> Any:
        """
        """
        rmtree(self._output_dir)
        mkdir(self._output_dir)

        if self._whitelist:
            whileisted_file_stems = self.__parse_whitelist()

        glob_result: Generator = self._glob_root.glob('**/*.md')
        count = 0

        entry_names = []

        for count, md in enumerate(glob_result):
            if self._whitelist and md.stem not in whileisted_file_stems:
                continue
            print('processing:', md.stem)

            name_normalised: str = md.stem.replace(' ', '_')
            entry_names.append(name_normalised)
            contents = md.read_text()
            with open(
                self._output_dir / (name_normalised + '.mdx'),
                mode='w',
                encoding='utf-8'
            ) as mdx:
                mdx.write(contents)
    
        with open(Path().cwd() / ENTRY_PAGEJS.path, mode='w', encoding='utf-8') as pjs:
            pjs.write(ENTRY_PAGEJS.layout_start)
            for name in entry_names:
                pjs.write(ENTRY_PAGEJS.slot_pattern % name)
            pjs.write(ENTRY_PAGEJS.layout_end)

        print(f'{count} files processed')

        # self.replace_wikilinks()
        self.generate_js_imports()


    def replace_wikilinks(self):
        """
        Replaces `[[Entry]]`, `[[Entry Whitespaces#id|alias]]` to
        
            <Link path="/maelstrom/entry">Entry</Link>
        """
        for mdx in self._output_dir.iterdir():
            contents_old = mdx.read_text()
            contents_new = ''
            mappings_cache = []
            for m in WIKILINK.PATTERN.finditer(contents_old):
                filename = m.group('filename')
                id = m.group('id')
                alias = m.group('alias')
                link = WIKILINK.LINK_COMPONENT_TEMPLATE.format(
                    filename.lower().replace(' ', '_'), alias or filename
                )
                mappings_cache.append((m.span(), link))
            contents_new = contents_old
            for mpair in reversed(mappings_cache):
                spans: tuple = mpair[0]
                string = mpair[1]
                contents_new = contents_new[:spans[0]] + string + contents_new[spans[1]:]
            
            # comments cleanup
            content_commentless = contents_new
            matches = []
            for match in self._RE_COMMENT.finditer(contents_new):
                matches.append(match.span())
            for section in reversed(matches):
                st, end = section
                content_commentless = content_commentless[:st] + content_commentless[end:]

            # process existing script tag
            if 'script' in content_commentless:
                mdx.write_text(self._MDX_IMPORTS[:-10] + content_commentless[9:])
            else:
                mdx.write_text(self._MDX_IMPORTS + content_commentless)

    def generate_js_imports(self) -> None:
        imports = []
        for mdx in self._output_dir.iterdir():
            imports.append(MDX_COMPONENT_LOADER.slot_pattern.format(mdx.stem, mdx.stem))
        js_loader_contents = ''.join([
            MDX_COMPONENT_LOADER.layout_start,
            *imports,
            MDX_COMPONENT_LOADER.layout_end,
        ])
        (Path().cwd() / MDX_COMPONENT_LOADER.path).write_text(js_loader_contents)
