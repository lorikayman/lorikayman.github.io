from pathlib import Path

from .cli import parser
from .source_modifier import SourceModifier

def main():
    args = parser.parse_args()

    whitelist = None
    if args.whitelist:
        whitelist = (Path().cwd() / args.whitelist)

    component_map = None
    if args.component_map:
        component_map = (Path().cwd() / args.component_map)

    modifier = SourceModifier(
        glob_root=Path().cwd() / args.root_dir,
        output_dir=Path().cwd() / args.output_dir,
        whitelist=whitelist,
        component_map=component_map,
    )
    modifier()
