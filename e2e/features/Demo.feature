Feature: A Feature for testing The permissions of folders for Admin users
  Background:
    Given I navigate to the URL "home page"
    Then I wait "DCirrus Login" title loaded
    Then I wait "1" seconds
    Then I click the "Dcirrus UserType" button
    Then I wait "1" seconds
    Then I fill in the "Dcirrus loginid" input with "rama.aws2016@gmail.com"
    Then I wait "1" seconds
    Then I fill in the "Dcirrus password" input with "Test@123"
    Then I wait "1" seconds
    Then I fill in the "Dcirrus corporateid" input with "0020382"
    Then I wait "1" seconds
    Then I fill in the "Dcirrus captcha" input with "captcha"
    Then I wait "10" seconds
    Then I click the "Dcirrus submit" button
    Then I wait "3" seconds
    Then I set "Failure" state of Execution

    @desktop
    @smoke
    @NewTestFolderCreation
  Scenario Outline: Testing the new create folder functionality
    Given I navigate to the URL "home page"
    Then I wait "1" seconds
    Then I navigate to the "drive folder" page
    Then I wait "1" seconds
    When I click the "pop create folder" button
    Then I wait "1" seconds
    Then I click the "create folder" button
    Then I wait "1" seconds
    Then I fill in the "folder name" input with "<folder>" and max limit "<maxLimit>"
    Then I wait "1" seconds
    Then I click the "ADD folder" button
    Then I wait "2" seconds
    Then I set "<SuccessStateAfter>" state of Execution

    Examples:
      | maxLimit         | folder           |  SuccessStateAfter |
      | 1000000000       | PermissionFolder |   Success          |

  @desktop
    @smoke
    @NewSubTestFolderCreation
  Scenario Outline: Testing the new sub create folder functionality
    Given I navigate to the URL "home page"
    Then I wait "3" seconds
    Then I navigate to the "drive folder" page
    Then I wait "3" seconds
    When I click the "pop create folder" button
    Then I wait "3" seconds
    Then I click the "create folder" button
    Then I wait "3" seconds
    Then I fill in the "folder name" input with "<folder>" and max limit "<maxLimit>"
    Then I wait "3" seconds
    Then I click the "ADD folder" button
    Then I wait "3" seconds
    Then I click the "<folder>" folder button
    Then I wait "10" seconds
    When I click the "pop create folder" button
    Then I wait "3" seconds
    Then I click the "create folder" button
    Then I wait "3" seconds
    Then I fill in the "folder name" input with "<folder>" and max limit "<maxLimit>"
    Then I wait "3" seconds
    Then I click the "ADD folder" button
    Then I wait "3" seconds
    Then I set "<SuccessStateAfter>" state of Execution

    Examples:
      | maxLimit         | folder           |  SuccessStateAfter |
      | 1000000000       | PermissionFolder |   Success          |

#   @desktop
#    @smoke
#    @NewUploadTestFolderCreation
#  Scenario Outline: Testing the upload folder functionality
#    Given I navigate to the URL "home page"
#    Then I wait "1" seconds
#    Then I navigate to the "drive folder" page
#    Then I wait "1" seconds
#    When I click the "pop create folder" button
#    Then I wait "3" seconds
#    Then I click the "upload folder" button
#    Then I wait "3" seconds
#    Then I created the "<folder>" with "<maxLimit>"
#    Then I uploaded the existing folder "<folder>" with element "upload folder frame"
#    Then I set "<SuccessStateAfter>" state of Execution
#
#    Examples:
#      | maxLimit         | folder           |  SuccessStateAfter |
#      | 1000000000       | PermissionFolder |   Success          |


#    @desktop
#    @smoke
#    @NewTestFolderCreationAdminpermission
#  Scenario Outline: Checking the permission setup for admin users for created folders
#    Then I wait "10" seconds
#    Then I navigate to the URL "permissions"
#    Then I get into window that will check "<user>" with admin rights has permissions for "<folder>"
#    Then I wait "10" seconds
#    Then I set "<SuccessStateAfter>" state of Execution
#    Examples:
#      | user             |  folder            |SuccessStateAfter |
#      | Akhil Gupta      |  PermissionFolder  |Success           |
#
#   Scenario Outline: Testing the upload folder functionality
#    Given I navigate to the URL "home page"
#    Then I wait "1" seconds
#    Then I navigate to the "drive folder" page
#    Then I wait "1" seconds
#    When I click the "pop create folder" button
#    Then I wait "1" seconds
#    Then I click the "create folder" button
#    Then I wait "1" seconds
#    Then I fill in the "folder name" input with "<folder>" and max limit "<maxLimit>"
#    Then I wait "1" seconds
#    Then I click the "ADD folder" button
#    Then I wait "2" seconds
#    Then I set "<SuccessStateAfter>" state of Execution
#
#     Examples:
#       | maxLimit         | folder           |  SuccessStateAfter |
#       | 1000000000       | PermissionFolder |   Success          |

