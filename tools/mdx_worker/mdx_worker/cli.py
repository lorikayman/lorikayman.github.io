from argparse import ArgumentParser

parser = ArgumentParser(
  prog='MDX Worker',
  description='Format markdown entries to MDX',
)

parser.add_argument(
  '--root-dir',
  dest='root_dir',
  required=True,
  help="Relative path to the root directory containing markdown hierarchy",
)

parser.add_argument(
  '--output-dir',
  dest='output_dir',
  required=True,
  help="Relative path to the output directory here MDXs will be placed",
)

parser.add_argument(
  '--whitelist',
  dest='whitelist',
  required=False,
  help="Whitelist of allowed to process markdown entry filenames",
)

parser.add_argument(
  '--component-map',
  dest='component_map',
  required=False,
  help="Maps WebComponents onto MDX Custom Components",
)
