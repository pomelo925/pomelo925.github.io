#!/usr/bin/env python3
"""
Status Overview Generator

This script automatically generates status overview tables for both Projects and Tutorials based on:
1. Navigation structure from mkdocs.yml
2. Status markers ({data-status}) in individual markdown files

Usage:
    python generate_status_overview.py
"""

import yaml
import re
import os
from pathlib import Path
from typing import Dict, List, Tuple, Optional


class StatusOverviewGenerator:
    def __init__(self, base_dir: str = None):
        # If base_dir is not provided, assume we're in scripts/ directory
        if base_dir is None:
            script_dir = Path(__file__).parent
            self.base_dir = script_dir.parent
        else:
            self.base_dir = Path(base_dir)
        
        self.docs_dir = self.base_dir / "docs"
        self.mkdocs_path = self.base_dir / "mkdocs.yml"
        
        # Status mapping - using CSS classes for custom styling
        self.status_icons = {
            "pending": '<span class="status-pending">Pending</span>',
            "in-progress": '<span class="status-in-progress">In Progress</span>', 
            "revising": '<span class="status-in-progress">Revising</span>',
            "done": '<span class="status-complete">Done</span>',
            "complete": '<span class="status-complete">Done</span>',
            "blocked": '<span class="status-blocked">Blocked</span>',
            "archived": '<span class="status-archived">Archived</span>'
        }
        
    def load_mkdocs_config(self) -> Dict:
        """Load and parse mkdocs.yml configuration"""
        try:
            with open(self.mkdocs_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"mkdocs.yml not found at {self.mkdocs_path}")
        except yaml.YAMLError as e:
            raise ValueError(f"Error parsing mkdocs.yml: {e}")
    
    def extract_nav_section(self, nav_config: List, section_name: str) -> List:
        """Extract specific section navigation structure from mkdocs config"""
        for item in nav_config:
            if isinstance(item, dict) and section_name in item:
                section_nav = item[section_name]
                # Remove the index.md entry and return the rest
                return [item for item in section_nav[1:] if isinstance(item, dict)]
        return []
    
    def get_file_status(self, file_path: str) -> str:
        """Extract status from markdown file using {data-status} markers"""
        full_path = self.docs_dir / file_path
        
        if not full_path.exists():
            return "pending"
        
        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Look for {data-status="value"} pattern
            status_pattern = r'\{data-status=["\']([^"\']+)["\']\}'
            matches = re.findall(status_pattern, content)
            
            if matches:
                # Return the first status found (assuming main document status)
                return matches[0].lower()
            else:
                # If file has content but no status marker, assume pending
                return "pending" if content.strip() else "pending"
                
        except Exception as e:
            print(f"Warning: Could not read {full_path}: {e}")
            return "pending"
    
    def parse_tutorial_nav_structure(self, nav_items: List) -> Dict[str, List[Tuple[str, str, str]]]:
        """Parse tutorial navigation structure and extract information by category"""
        categories = {}
        
        for category_item in nav_items:
            if not isinstance(category_item, dict):
                continue
                
            for category_name, sections in category_item.items():
                if not isinstance(sections, list):
                    continue
                
                category_tutorials = []
                
                for section_item in sections:
                    # Skip index.md files
                    if isinstance(section_item, str) and section_item.endswith('index.md'):
                        continue
                        
                    if not isinstance(section_item, dict):
                        continue
                        
                    for section_name, tutorials_list in section_item.items():
                        if not isinstance(tutorials_list, list):
                            continue
                            
                        for tutorial_file in tutorials_list:
                            if isinstance(tutorial_file, str) and tutorial_file.endswith('.md'):
                                # Extract tutorial name from filename
                                tutorial_name = self.extract_name_from_path(tutorial_file)
                                status = self.get_file_status(tutorial_file)
                                
                                category_tutorials.append((
                                    section_name,
                                    tutorial_name,
                                    self.status_icons.get(status, '<span class="status-pending">Pending</span>')
                                ))
                
                if category_tutorials:
                    categories[category_name] = category_tutorials
        
        return categories
    
    def parse_project_nav_structure(self, nav_items: List) -> List[Tuple[str, str]]:
        """Parse project navigation structure and extract information"""
        projects = []
        
        for item in nav_items:
            if isinstance(item, str) and item.endswith('.md'):
                # Direct project file
                project_name = self.extract_name_from_path(item)
                status = self.get_file_status(item)
                
                projects.append((
                    project_name,
                    self.status_icons.get(status, '<span class="status-pending">Pending</span>')
                ))
            elif isinstance(item, dict):
                # Project with custom name
                for project_name, project_file in item.items():
                    if isinstance(project_file, str) and project_file.endswith('.md'):
                        status = self.get_file_status(project_file)
                        
                        projects.append((
                            project_name,
                            self.status_icons.get(status, '<span class="status-pending">Pending</span>')
                        ))
        
        return projects
    
    def extract_name_from_path(self, file_path: str) -> str:
        """Extract name from file path by reading the title from the markdown file"""
        # Get filename without extension
        filename = Path(file_path).stem
        
        # Try to read the title from the markdown file
        full_path = self.docs_dir / file_path
        title_from_file = self.get_title_from_markdown(full_path)
        
        if title_from_file:
            # Return the title from file as-is (it already contains the numbering)
            return title_from_file
        
        # Fallback to filename processing if no title found in file
        if '.' in filename:
            # Split by the last dot to separate number prefix from name
            parts = filename.split('.')
            if len(parts) == 2:
                prefix = parts[0]  # e.g., "1-1" 
                name_part = parts[1]  # e.g., "installation"
                
                # Convert name part to title case
                converted_name = name_part.replace('-', ' ').replace('_', ' ').title()
                return f"{prefix}.{converted_name}"
        
        # Final fallback for files without dot
        return filename.replace('-', ' ').replace('_', ' ').title()
    
    def get_title_from_markdown(self, file_path: Path) -> Optional[str]:
        """Extract the first H1 title from a markdown file"""
        if not file_path.exists():
            return None
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Look for the first H1 title (# Title)
            lines = content.split('\n')
            for line in lines:
                line = line.strip()
                if line.startswith('# ') and len(line) > 2:
                    # Extract title after '# '
                    title = line[2:].strip()
                    
                    # Remove {data-status} markers
                    title = re.sub(r'\s*\{data-status=[^}]+\}', '', title)
                    
                    # Remove any markdown formatting like links, bold, etc.
                    title = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', title)  # Remove links
                    title = re.sub(r'\*\*([^*]+)\*\*', r'\1', title)  # Remove bold
                    title = re.sub(r'\*([^*]+)\*', r'\1', title)  # Remove italic
                    title = re.sub(r'`([^`]+)`', r'\1', title)  # Remove code
                    return title.strip()
            
            return None
            
        except Exception as e:
            print(f"Warning: Could not read title from {file_path}: {e}")
            return None
    
    def generate_category_table_markdown(self, tutorials: List[Tuple[str, str, str]]) -> str:
        """Generate markdown table for a specific category"""
        if not tutorials:
            return "No tutorials found in this category."
        
        # Table header
        table = "| Section | Subsection | Status |\n"
        table += "|---------|----------|--------|\n"
        
        # Group tutorials by section for better formatting
        current_section = ""
        
        for section, tutorial, status in tutorials:
            section_cell = section if section != current_section else ""
            table += f"| {section_cell} | {tutorial} | {status} |\n"
            current_section = section
        
        return table
    
    def generate_project_table_markdown(self, projects: List[Tuple[str, str]]) -> str:
        """Generate markdown table for projects"""
        if not projects:
            return "No projects found."
        
        # Table header
        table = "| Project | Status |\n"
        table += "|---------|--------|\n"
        
        for project, status in projects:
            table += f"| {project} | {status} |\n"
        
        return table
    
    def generate_software_content(self, tutorials: List[Tuple[str, str, str]]) -> str:
        """Generate software category status content"""
        table = self.generate_category_table_markdown(tutorials)
        
        content = """# I. Software

## Status Overview

> This table is auto-generated.

{table}
""".format(table=table)
        
        return content
    
    def generate_robot_content(self, tutorials: List[Tuple[str, str, str]]) -> str:
        """Generate robot category status content"""
        table = self.generate_category_table_markdown(tutorials)
        
        content = """# II. Robot

## Status Overview

> This table is auto-generated.

{table}
""".format(table=table)
        
        return content
    
    def generate_hardware_content(self, tutorials: List[Tuple[str, str, str]]) -> str:
        """Generate hardware category status content"""
        table = self.generate_category_table_markdown(tutorials)
        
        content = """# III. Hardware

## Status Overview

> This table is auto-generated.

{table}
""".format(table=table)
        
        return content
    
    def generate_project_content(self) -> str:
        """Generate complete project status content"""
        try:
            # Load mkdocs config
            config = self.load_mkdocs_config()
            
            # Extract project navigation
            project_nav = self.extract_nav_section(config.get('nav', []), 'Projects')
            
            if not project_nav:
                return "No project navigation found in mkdocs.yml"
            
            # Parse navigation structure
            projects = self.parse_project_nav_structure(project_nav)
            
            # Generate table
            table = self.generate_project_table_markdown(projects)
            
            # Generate complete content
            content = """# Projects

Here are my various projects, including competitions, personal projects, and more.

## Project Status Overview

> This table is auto-generated.

{table}
""".format(table=table)
            
            return content
            
        except Exception as e:
            return f"Error generating project status: {e}"
    
    def update_tutorial_indexes(self):
        """Update all tutorial category index.md files with generated content"""
        try:
            # Load mkdocs config
            config = self.load_mkdocs_config()
            
            # Extract tutorial navigation
            tutorial_nav = self.extract_nav_section(config.get('nav', []), 'Tutorials')
            
            if not tutorial_nav:
                print("❌ No tutorial navigation found in mkdocs.yml")
                return
            
            # Parse navigation structure by category
            categories = self.parse_tutorial_nav_structure(tutorial_nav)
            
            # Update each category's index.md
            for category_name, tutorials in categories.items():
                try:
                    # Determine the content generator and file path based on category
                    if category_name == "I. Software":
                        content = self.generate_software_content(tutorials)
                        file_path = self.docs_dir / "tutorials" / "I.Software" / "index.md"
                    elif category_name == "II. Robot":
                        content = self.generate_robot_content(tutorials)
                        file_path = self.docs_dir / "tutorials" / "II.Robot" / "index.md"
                    elif category_name == "III. Hardware":
                        content = self.generate_hardware_content(tutorials)
                        file_path = self.docs_dir / "tutorials" / "III.Hardware" / "index.md"
                    else:
                        print(f"⚠️ Unknown category: {category_name}, skipping...")
                        continue
                    
                    # Write the content to file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
                    print(f"✅ Successfully updated {file_path}")
                    
                except Exception as e:
                    print(f"❌ Error updating {category_name} index: {e}")
            
        except Exception as e:
            print(f"❌ Error updating tutorial indexes: {e}")
    
    def update_tutorial_index(self):
        """This method is deprecated, use update_tutorial_indexes instead"""
        print("⚠️ update_tutorial_index is deprecated, use update_tutorial_indexes instead")
        self.update_tutorial_indexes()
    
    def update_project_index(self):
        """Update the project index.md file with generated content"""
        project_index_path = self.docs_dir / "projects" / "index.md"
        
        try:
            new_content = self.generate_project_content()
            
            with open(project_index_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            print(f"✅ Successfully updated {project_index_path}")
            
        except Exception as e:
            print(f"❌ Error updating project index: {e}")
    
    def update_all(self):
        """Update both tutorial category indexes and project index files"""
        print("🔄 Updating all status overview tables...")
        self.update_tutorial_indexes()
        self.update_project_index()


def main():
    """Main function"""
    generator = StatusOverviewGenerator()
    generator.update_all()


if __name__ == "__main__":
    main()
