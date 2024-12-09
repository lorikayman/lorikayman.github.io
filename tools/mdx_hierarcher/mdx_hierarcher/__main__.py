from pathlib import Path

from .cli import parser
from .source_modifier import SourceModifier

def main():
    args = parser.parse_args()
    whitelist = None
    if args.whitelist:
        whitelist = (Path().cwd() / args.whitelist)
    modifier = SourceModifier(
        Path().cwd() / args.root_dir,
        Path().cwd() / args.output_dir,
        whitelist,
    )
    modifier()
